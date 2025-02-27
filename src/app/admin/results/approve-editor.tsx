'use client';
import * as React from 'react';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { LoadingButton } from "@mui/lab";
import AlertTitle from '@mui/material/AlertTitle';
import MuiAlert from '@mui/material/Alert';
import axiosInterceptorInstance from '../../../../axiosInterceptorInstance';
import '../../../public/css/base.css'
import { STATUS_ENUMS } from '../../../../config';
import { userData } from '@/app/hooks/use-responsive';
import { format } from "date-fns";
import ConfirmAlert from '@/app/components/confirm-alert';
import { useSnackbar } from '@/app/hooks/snackbar-service';

type formValues = {
    IsApproved: number;
}

interface CustomModalProps {
    row: any;
    onClose: (status: boolean) => void;
  }

const ApproveEditor: React.FC<CustomModalProps> = ({row, onClose}) => {
    const { showMessage } = useSnackbar();  
    const userInfo = userData();
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [openConfirmAlert, setOpenConfirmAlert] = useState(false);

    const {setValue } = useForm();
    const form = useForm<formValues>({
        defaultValues: {
            IsApproved: row?.eventStatus || 0,
        }
    });
    
    const { register, handleSubmit, formState, getValues } = form;
    const { errors } = formState;
    const onSubmit = async (data: formValues) => {
        setOpenConfirmAlert(true);
        
    }

    const handleConfirmAlertClose = (status: boolean = false) => {
        if(status){
            updateParticipants(getValues())
        }
        setOpenConfirmAlert(false);
    }

    const updateParticipants  = async (data: any) => {
        setErrMsg('');
        setLoading(true);
        const payLoad = {
            "ID_EventResult":row.iD_EventResult,
            "IsApproved": data?.IsApproved,
        }
        try {
            const response = await axiosInterceptorInstance.post(`v1/eventresult`, payLoad);
            if (response?.data) {
                const result = response.data.result;
                // console.log(result)
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
    };
    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 gap-3 mb-2">
                    <div className="col-span-4 font-medium">
                        Event Name:
                    </div>
                    <div className="col-span-8">
                        {row?.eventName}
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-3 mb-2">
                    <div className="col-span-4 font-medium">
                        Event Category:
                    </div>
                    <div className="col-span-8">
                        {row?.eventCategory}
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-3 mb-2">
                    <div className="col-span-4 font-medium">
                        Event Type:
                    </div>
                    <div className="col-span-8">
                        {row?.eventType}
                    </div>
                </div>



                <div className="grid grid-cols-12 gap-3 mb-2">
                    <div className="col-span-4 font-medium">
                        Participant Name:
                    </div>
                    <div className="col-span-8">
                        {row?.participantName}
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-3 mb-2">
                    <div className="col-span-4 font-medium">
                        Mobile:
                    </div>
                    <div className="col-span-8">
                        {row?.mobileNumber}
                    </div>
                </div>
                

                <div className="grid grid-cols-12 gap-3 mb-2">
                    <div className="col-span-4 font-medium">
                        Position:
                    </div>
                    <div className="col-span-8">
                        {row?.eventPosition}
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-3 mb-3">
                    <div className="col-span-4 font-medium">
                        Company Name:
                    </div>
                    <div className="col-span-8">
                        {row?.companyName}
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-3 mb-3 mt-4">
                    <div className="col-span-4 font-medium">
                        Status:
                    </div>
                    <div className="col-span-8">

                        <FormControl sx={{ width: '100%', mt: 0 }}>
                            <InputLabel id="eventApproved-label" size="small">Status</InputLabel>
                            <Select
                                size="small"
                                fullWidth
                                id="eventApproved"
                                label="eventApproved"
                                {...register("IsApproved", { required: "Status is required" })}
                                error={!!errors.IsApproved}
                                defaultValue={row?.eventStatus}
                                disabled={loading}>
                                {STATUS_ENUMS.map((item: any) => (
                                    <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <LoadingButton
                    type="submit"
                    fullWidth
                    loading={loading}
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 2, mb: 2 }}
                >
                    <span>Submit</span>
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

            <ConfirmAlert open={openConfirmAlert} onClose={handleConfirmAlertClose} type={'CONFIRM'} title={'Confirm'} message={`Are you sure you want to update status ?`}></ConfirmAlert>

        </>
    )
}

export default ApproveEditor;