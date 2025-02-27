'use client';
import * as React from 'react';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material'
import { LoadingButton } from "@mui/lab";
import AlertTitle from '@mui/material/AlertTitle';
import MuiAlert from '@mui/material/Alert';
import axiosInterceptorInstance from '../../../../axiosInterceptorInstance';
import '../../../public/css/base.css'
import { userData } from '@/app/hooks/use-responsive';
import { useSnackbar } from '@/app/hooks/snackbar-service';
type formValues = {
    eventTypeName: string;
    eventDescription: string;
}

interface EditorProps {
    row: any;
    onClose: (status: boolean) => void;
}

const Editor: React.FC<EditorProps> = ({ row, onClose }) => {
    const { showMessage } = useSnackbar();  
    const userInfo = userData();
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    
    const form = useForm<formValues>({
        defaultValues: {
            eventTypeName:  row?.eventTypeName || '',
            eventDescription: row?.eventDescription || '',
        }
    });

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const onSubmit = async (data: formValues) => {
        setErrMsg('');
        setLoading(true);
        const payLoad = {
            "ID_EventType": row?.iD_EventType || 0,
            "EventTypeName": data.eventTypeName,
            "EventDescription": data.eventDescription,
            "CreatedBy": userInfo.iD_Users,
            "ModifiedBy": userInfo.iD_Users
        }
        try {
            const response = await axiosInterceptorInstance.post(`v1/eventtypes`, payLoad);
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
                <TextField
                    size="small"
                    margin="normal"
                    fullWidth
                    id="eventTypeName"
                    label="Name"
                    {...register("eventTypeName", { required: "Event Type Name is required" })}
                    error={!!errors.eventTypeName}
                    disabled={loading}
                />

                <TextField
                    size="small"
                    margin="normal"
                    fullWidth
                    id="eventDescription"
                    label="Description"
                    {...register("eventDescription", { required: "Event Description is required" })}
                    error={!!errors.eventDescription}
                    multiline
                    maxRows={4}
                    disabled={loading}
                    inputProps={{
                        style: {
                          height: 'auto'
                        },
                    }}
                />

                <LoadingButton
                    type="submit"
                    fullWidth
                    loading={loading}
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 2, mb: 2 }}
                >
                    <span>{row?.iD_EventType ? 'Update' : 'ADD'}</span>
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