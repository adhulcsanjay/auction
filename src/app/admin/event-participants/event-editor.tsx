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
    paymentApproved: number;
    eventApproved: number;
    remarks: string;
}

interface CustomModalProps {
    row: any;
    onClose: (status: boolean) => void;
  }

const EventEditor: React.FC<CustomModalProps> = ({row, onClose}) => {
    const { showMessage } = useSnackbar();  
    const userInfo = userData();
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [openConfirmAlert, setOpenConfirmAlert] = useState(false);

    const {setValue } = useForm();
    const form = useForm<formValues>({
        defaultValues: {
            paymentApproved: row?.paymentApproved || 0,
            eventApproved: row?.eventApproved || 0,
            remarks: row?.remarks || '',
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
            "ID_EventRegisterDetails": row.iD_EventRegisterDetails,
            "EventApproved": data.eventApproved,
            "PaymentApproved": data.paymentApproved,  
            "Remarks": data.remarks,
            "CreatedBy": userInfo.iD_Users
        }
        try {
            const response = await axiosInterceptorInstance.post(`v1/participants`, payLoad);
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
                        {row?.eventCategory === 1 ? 'Solo' : 'Group'}
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-3 mb-2">
                    <div className="col-span-4 font-medium">
                        Event Type:
                    </div>
                    <div className="col-span-8">
                        {row?.eventTypeName}
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-3 mb-2">
                    <div className="col-span-4 font-medium">
                        Date & Time:
                    </div>
                    <div className="col-span-8">
                    { format(new Date(row?.eventDate), 'dd/MM/yyyy')} { format(new Date(row?.eventDate), 'h:mm a')} 
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-3 mb-2">
                    <div className="col-span-4 font-medium">
                        Location:
                    </div>
                    <div className="col-span-8">
                        {row?.eventLocation}
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-3 mb-2">
                    <div className="col-span-4 font-medium">
                        Event Fee:
                    </div>
                    <div className="col-span-8">
                        {row?.eventFee}
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-3 mb-2">
                    <div className="col-span-4 font-medium">
                        Participant Name:
                    </div>
                    <div className="col-span-8">
                        {row?.firstName}
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-3 mb-2">
                    <div className="col-span-4 font-medium">
                        Email:
                    </div>
                    <div className="col-span-8">
                        {row?.email}
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
                        Event Status:
                    </div>
                    <div className="col-span-8">

                        <FormControl sx={{ width: '100%', mt: 0 }}>
                            <InputLabel id="eventApproved-label" size="small">Event Status</InputLabel>
                            <Select
                                size="small"
                                fullWidth
                                id="eventApproved"
                                label="eventApproved"
                                {...register("eventApproved", { required: "Event status is required" })}
                                error={!!errors.eventApproved}
                                defaultValue={row.eventApproved}
                                disabled={loading}>
                                {STATUS_ENUMS.map((item: any) => (
                                    <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-3 mb-3 mt-4">
                    <div className="col-span-4 font-medium">
                        Payment Status:
                    </div>
                    <div className="col-span-8">
                        <FormControl sx={{ width: '100%', mt: 0 }}>
                            <InputLabel id="paymentApproved-label" size="small">Payment Status</InputLabel>
                            <Select
                                size="small"
                                fullWidth
                                id="paymentApproved"
                                label="paymentApproved"
                                {...register("paymentApproved", { required: "Payment status is required" })}
                                error={!!errors.paymentApproved}
                                defaultValue={row.paymentApproved}
                                disabled={loading}>
                                {STATUS_ENUMS.map((item: any) => (
                                    <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-3 mb-2 mt-4">
                    <div className="col-span-4 font-medium">
                        Remark:
                    </div>
                    <div className="col-span-8">
                        <TextField
                            size="small"
                            margin="normal"
                            fullWidth
                            id="remarks"
                            label="Remark"
                            {...register("remarks")}
                            multiline
                            maxRows={4}
                            defaultValue={row.remarks}
                            disabled={loading}
                            sx={{ mt: 0 }}
                        />
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

export default EventEditor;