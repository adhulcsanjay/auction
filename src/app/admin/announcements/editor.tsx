'use client';
import * as React from 'react';
import { useState, useEffect } from "react";
import { Controller, useForm } from 'react-hook-form';
import { Box, FormHelperText, TextField, Typography } from '@mui/material'
import { LoadingButton } from "@mui/lab";
import AlertTitle from '@mui/material/AlertTitle';
import MuiAlert from '@mui/material/Alert';
import axiosInterceptorInstance from '../../../../axiosInterceptorInstance';
import '../../../public/css/base.css'
import { userData } from '@/app/hooks/use-responsive';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import dynamic from 'next/dynamic';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSnackbar } from '@/app/hooks/snackbar-service';

type formValues = {
    announcementtext: string;
    announcementFromDate: string;
    announcementToDate: string;
}

interface EditorProps {
    row: any;
    onClose: (status: boolean) => void;
}

const Editor: React.FC<EditorProps> = ({ row, onClose }) => {

    const ReactQuill = React.useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
    const { showMessage } = useSnackbar();
    const userInfo = userData();
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [fromDate, setFromDate] = useState<Dayjs | null>();
    const [toDate, setToDate] = useState<Dayjs | null>();

    useEffect(() => {
        if (row) {
            setFromDate(dayjs(row?.announcementFromDate));
            setToDate(dayjs(row?.announcementToDate));
        }
    }, [row]);

    const form = useForm<formValues>({
        defaultValues: {
            announcementtext: row?.announcementtext || '',
            announcementFromDate: row?.announcementFromDate || '',
            announcementToDate: row?.announcementToDate || '',
        }
    });    

    const handleDateChange = (val: any, type: string) => {
        const date = dayjs(val);
        if (type === 'FROM') {
            setFromDate(date);
            setValue("announcementFromDate", dayjs(fromDate).format('YYYY-MM-DD'));
        }
        if (type === 'TO') {
            setToDate(date);
            setValue("announcementToDate", dayjs(toDate).format('YYYY-MM-DD'));
        }
    };

    const onEditorStateChange = (editorState: any) => {
        setValue("announcementtext", editorState);
    };

    const { register, handleSubmit, formState, setValue, control, watch, } = form;


    const editorContent = watch("announcementtext");

    useEffect(() => {
        register("announcementtext", { required: true });
    }, [register]);

    const { errors } = formState;
    const onSubmit = async (data: formValues) => {
        setErrMsg('');
        setLoading(true);
        data.announcementFromDate = dayjs(fromDate).format('YYYY-MM-DD');
        data.announcementToDate = dayjs(toDate).format('YYYY-MM-DD');
        const payLoad = {
            "ID_Announcement": row?.iD_Announcement || 0,
            "Announcementtext": data.announcementtext,
            "AnnouncementFromDate": data.announcementFromDate,
            "AnnouncementToDate": data.announcementToDate,
            "CreatedBy": userInfo.iD_Users,
            "ModifiedBy": userInfo.iD_Users
        }
        try {
            const response = await axiosInterceptorInstance.post(`v1/announcement`, payLoad);
            if (response?.data) {
                const result = response.data.result;
                console.log(result)
                if (result.responseStatus) {
                    onClose(true);
                } else {
                    setErrMsg(result.responseMessage);
                }
                setLoading(false);
            }
        } catch (error: any) {
            showMessage(error, 'error');
            console.error(error);
        }
    }
    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                {/* <TextField
                    size="small"
                    margin="normal"
                    fullWidth
                    id="announcementtext"
                    label="Announcement"
                    multiline
                    maxRows={4}
                    {...register("announcementtext", { required: "Event Type Name is required" })}
                    error={!!errors.announcementtext}
                    disabled={loading}
                    inputProps={{
                        style: {
                          height: 'auto'
                        },
                    }}
                /> */}
                {/* <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 'normal' }} variant="h6" component="div">
                Announcement 
                </Typography>   */}
                <ReactQuill style={{ maxWidth: '360px' }} theme="snow" value={editorContent} onChange={onEditorStateChange} placeholder="Announcement" />
                <FormHelperText className='Mui-error'>{errors.announcementtext && "Announcement is required"}</FormHelperText>
                
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker
                        slotProps={{ textField: { size: 'small', sx: { mt: 2, width: '100%' }, error: !!errors.announcementFromDate, helperText: errors.announcementToDate?.message } }}
                        label="From Date"
                        value={fromDate}
                        onChange={(e: any) => handleDateChange(e, 'FROM')}
                    />
                </LocalizationProvider>
                <FormHelperText className='Mui-error'>{errors.announcementFromDate && "Announcement From Date is required"}</FormHelperText>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        slotProps={{ textField: { size: 'small', sx: { mt: 3, width: '100%' }, error: !!errors.announcementToDate, helperText: errors.announcementToDate?.message } }}
                        label="To Date"
                        value={toDate}
                        onChange={(e: any) => handleDateChange(e, 'TO')}
                    />
                </LocalizationProvider>
                <FormHelperText className='Mui-error'>{errors.announcementToDate && "Announcement To Date is required"}</FormHelperText>

                <LoadingButton
                    type="submit"
                    fullWidth
                    loading={loading}
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 2, mb: 2 }}
                >
                    <span>{row?.iD_Announcement ? 'Update' : 'ADD'}</span>
                </LoadingButton>

                {
                    errMsg ?
                        <div className="mt-1 mb-3 text-sm">
                            <MuiAlert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {errMsg}
                            </MuiAlert>
                        </div>
                        : <></>
                }

            </Box>

        </>
    )
}

export default Editor;