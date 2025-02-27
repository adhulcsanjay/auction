'use client';
// import * as React from 'react';
// import { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { Container, Stack, Card, CardHeader, Box, TextField, styled, Button, MenuItem, Autocomplete, FormControl } from '@mui/material'
import { LoadingButton } from "@mui/lab";
import AlertTitle from '@mui/material/AlertTitle';
import MuiAlert from '@mui/material/Alert';
import axiosInterceptorInstance from '../../../../axiosInterceptorInstance';
import '../../../public/css/base.css'
import { userData } from '@/app/hooks/use-responsive';
import getApiUrl from '../../../../config';
import React, { useEffect, useState, useRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import userAvatar from '../../../public/img/user-large.png'
import { useSnackbar } from '@/app/hooks/snackbar-service';
import { useRouter } from 'next/navigation';
// import Toast from '@/app/components/toast';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

type formValues = {
    ID_Users: number;
    FirstName: string;
    LastName: string;
    MobileNumber: string;
  
}
interface ProfileProps {
    formData: any;
    // onClose: (status: boolean) => void;
}
// export default function MyProfile() {
export default function MyProfile({ formData }: any) {
    const router = useRouter()
    const [submittedData, setSubmittedData] = useState<formValues | null>(null); // State to store submitted data
    const count = useRef(0);
    const { showMessage } = useSnackbar();
    const [photoID, setPhotoId] = useState(formData?.fK_UserImages);
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs(formData?.dateOfBirth));
    const [companyData, setCompanyData] = useState([]);
    const [otherCompanyValue, setOtherCompanyValue] = useState<any>(null);
    const [formattedDate, setFormattedDateDate] = useState('');
    const [currentUser, setCurrentUser] = useState<any>();
    const [selectedCompany, setSelectedCompany] = useState<any>(null);
    const profileImgInputRef: any = useRef(null);
    const [regId, setRegId] = useState(formData?.registrationID)

    const userInfo = userData();
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [selectedPhoto, setSelectedPhoto] = useState(userAvatar.src);
    const [validationMsg, setValidationMsg] = useState('');
    const [validationFlag, setValidationFlag] = useState(false);

    const [companyList, setCompanyList] = useState([]);
    const maxDate = dayjs();

    // const [toastOpen, setToastOpen] = useState(false);
    // const [toastConfig, setToastConfig] = useState({message: '', severity: 'success'});

    // const handleCloseToast = () => {
    //     setToastOpen(false);
    // };

    const form = useForm<formValues>({
        defaultValues: {
            ID_Users: formData?.iD_Users,
            FirstName: formData?.firstName,
            LastName: formData?.lastName,
            MobileNumber: formData?.mobileNumber,
        },
    });


    const { register, handleSubmit, formState, setValue, control } = form;
    const { errors } = formState;
  


    const onSubmit = async (data: formValues) => {
        setErrMsg('');
        setLoading(true);
        try {
            const response = await axiosInterceptorInstance.post(`v1/signup`, data);
            if (response?.data) {
                const result = response.data.result;
                if (result.responseStatus) {
                    // setToastOpen(true);
                    // setToastConfig({ message: result.responseMessage, severity: 'success' });

                    showMessage(result.responseMessage, 'success');
                    router.push('/user/dashboard');

                } else {
                    setErrMsg(result.responseMessage);
                    // setToastOpen(true);
                    // setToastConfig({ message: result.responseMessage, severity: 'error' });
                    showMessage(result.responseMessage, 'error');
                }
                setLoading(false);
            }
        } catch (error: any) {
            showMessage(error, 'error');
            // setToastOpen(true);
            // setToastConfig({ message: error, severity: 'error' });

            console.error(error);
        }
    }
    

 

  


    const isNotBlank = (value: any) => {
        // Check if the value contains only spaces
        if (value.trim() === '') {
            return 'Field cannot be empty or contain only spaces';
        }
        return true;
    };

    return (
        <Container sx={{ px: '0 !important' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} />
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-10">
                    <Card sx={{ boxShadow: 0 }}>
                        <CardHeader
                            title={`My profile`}
                            titleTypographyProps={{
                                fontSize: 16,
                                fontFamily: 'inherit',
                                fontWeight: 500,
                                className: 'card-title',
                            }}
                        />
                        <Box sx={{ mx: 3 }} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-3">
                                <TextField
                                    size="small"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fname"
                                    label="First Name"
                                    {...register('FirstName', {
                                        required: 'First name is required',
                                        pattern: {
                                            value: /^[A-Za-z ]+$/,
                                            message: 'Invalid name format',
                                        },
                                    })}
                                    error={!!errors.FirstName}
                                    helperText={errors.FirstName?.message}
                                />
                                <TextField
                                    size="small"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="lname"
                                    label="Last Name"
                                    {...register('LastName', {
                                        required: 'Last name is required',
                                        pattern: {
                                            value: /^[A-Za-z ]+$/,
                                            message: 'Invalid name format',
                                        },
                                    })}
                                    error={!!errors.LastName}
                                    helperText={errors.LastName?.message}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <TextField
                                    size="small"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Phone"
                                    label="Mobile Number"
                                    type="text"
                                    {...register('MobileNumber', {
                                        required: 'Mobile number is required',
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: 'Invalid mobile number',
                                        },
                                    })}
                                    error={!!errors.MobileNumber}
                                    helperText={errors.MobileNumber?.message}
                                />
                            </div>
                            <LoadingButton
                                type="submit"
                                fullWidth
                                loading={loading}
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                            >
                                <span>Update</span>
                            </LoadingButton>
                            {errMsg && (
                                <div className="mt-1 mb-3 text-sm">
                                    <MuiAlert severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        {errMsg}
                                    </MuiAlert>
                                </div>
                            )}
                        </Box>
                    </Card>
                </div>
            </div>
            {submittedData && (
                <Card sx={{ mt: 3, p: 2 }}>
                    <h3>Submitted Data</h3>
                    <p><strong>First Name:</strong> {submittedData.FirstName}</p>
                    <p><strong>Last Name:</strong> {submittedData.LastName}</p>
                    <p><strong>Mobile Number:</strong> {submittedData.MobileNumber}</p>
                </Card>
            )}
        </Container>
    );
}
