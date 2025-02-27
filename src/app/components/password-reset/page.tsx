'use client';
import * as React from 'react';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { Container, Stack, Card, CardHeader, Box, TextField } from '@mui/material'
import { LoadingButton } from "@mui/lab";
import AlertTitle from '@mui/material/AlertTitle';
import MuiAlert from '@mui/material/Alert';
import axiosInterceptorInstance from '../../../../axiosInterceptorInstance';
import '../../../public/css/base.css'
import { userData } from '@/app/hooks/use-responsive';
import { useSnackbar } from '@/app/hooks/snackbar-service';
// import Toast from '@/app/components/toast';

type formValues = {
    UserPassword: string;
    OldPassword: string;
    ConfirmPassword: string;
}

export default function PasswordReset() {
    const { showMessage } = useSnackbar();  
    const userInfo = userData();
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    // const [toastOpen, setToastOpen] = useState(false);
    // const [toastConfig, setToastConfig] = useState({message: '', severity: 'success'});

    // const handleCloseToast = () => {
    //     setToastOpen(false);
    // };


    const form = useForm<formValues>({
        defaultValues: {
            UserPassword: '',
            OldPassword: '',
            ConfirmPassword: ''
        }
    });
    const { register, handleSubmit, formState, reset, watch } = form;
    const { errors } = formState;
    const onSubmit = async (data: formValues) => {
        setErrMsg('');
        setLoading(true);
        const payLoad = {
            "ID_Users": userInfo.iD_Users,
            "UserPassword": data.UserPassword,
            "OldPassword": data.OldPassword,
            "ConfirmPassword": data.ConfirmPassword    
        }
        try {
            const response = await axiosInterceptorInstance.post(`v1/changepassword`, payLoad);
            if (response?.data) {
                const result = response.data.result;
                console.log(result)
                if (result.responseStatus) {
                    // setToastOpen(true);
                    // setToastConfig({ message: result.responseMessage, severity: 'success' });

                    showMessage(result.responseMessage, 'success'); 
                    reset();
                    
                } else {
                    setErrMsg(result.responseMessage);
                   
                }
                setLoading(false);
            }
        } catch (error: any) {
            // setToastOpen(true);
            // setToastConfig({ message: error, severity: 'error' });

            showMessage(error, 'error'); 
            console.error(error);
        }
    }
    return (
        <Container sx={{ px: '0 !important' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            </Stack>

            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-6">
                    <Card sx={{ boxShadow: 0 }}>
                        <CardHeader title='Change Password'
                            titleTypographyProps={{
                                fontSize: 16,
                                fontFamily: 'inherit',
                                fontWeight: 500,
                                className: 'card-title'
                            }} />
                        <Box sx={{ mx: 3 }} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                type='password'
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                id="currentPassword"
                                label="Current Password"
                                {...register("OldPassword", { required: "Current Password is required" })}
                                error={!!errors.OldPassword}
                                helperText={errors.OldPassword?.message}
                            />

                            <TextField
                                type='password'
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                id="newPassword"
                                label="New Password"
                                {...register("UserPassword", { 
                                    required: "New Password is required",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                        message:
                                            'Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one number, and one special character',
                                    },
                                 })}
                                error={!!errors.UserPassword}
                                helperText={errors.UserPassword?.message}
                            />

                            <TextField
                                type='password'
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                id="confirmPassword"
                                label="Confirm Password"
                                {...register("ConfirmPassword", { 
                                    required: "Confirm Password is required", 
                                    validate: (val: string) => {
                                    if (watch('UserPassword') != val) {
                                      return "New Password and Confirm Password does not match";
                                    }
                                  }, })}
                                error={!!errors.ConfirmPassword}
                                helperText={errors.ConfirmPassword?.message}
                            />

                            

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

                    </Card>

                </div>
            </div>
            {/* <Toast 
            open={toastOpen}
            message={toastConfig.message}
            onClose={handleCloseToast}
            severity={toastConfig.severity}/> */}


        </Container>
    )
}
