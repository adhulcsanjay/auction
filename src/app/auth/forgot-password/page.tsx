'use client';
import { Box, TextField } from '@mui/material'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import AlertTitle from '@mui/material/AlertTitle';
import * as React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from '@/app/hooks/snackbar-service';
import getApiUrl from '../../../../config';
type formValues = {
    Email: string;
}

export default function ForgotPassword() {
    const { showMessage } = useSnackbar();  
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
  
    if (typeof window !== 'undefined') {
        const sessionData = sessionStorage.getItem('session');
        if (sessionData) {
            redirect('/user/dashboard');
        }
    }

    const form = useForm<formValues>({
        defaultValues: {
            Email: '',
        }
    });
    const {register, handleSubmit, formState} = form;
    const {errors} = formState;
    const onSubmit = async (data: formValues)=>{
        setErrMsg('');
        setLoading(true);
        const response = await fetch(`${getApiUrl()}v1/forgotpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const data = await response.json();
            if(data.result.responseStatus){                
                showMessage('Check your inbox for temporary password!', 'success');     
            } else {
                setErrMsg(data.result.responseMessage);
            }
            setLoading(false)
        } else {
           setLoading(false)
           showMessage('Something went wrong!', 'error');   
           console.error('Failed:', response.statusText);
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-164px)] items-center justify-center">
            <div className='mt-20 lg:mt-0'>
                <div className="w-full flex-1">
                    <div className="mx-auto max-w-xs">
                        <h1 className="text-3xl font-bold color-primary">
                            Forgot Password
                        </h1>
                        <p className='text-sm'>To reset your password, enter the email address you use to log in.</p>
                    </div>
                </div>
                <div className="w-full flex-1 mt-4 mb-8">
                    <div className="mx-auto max-w-xs">
                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                            <TextField
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                {...register("Email", {required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                                error={!!errors.Email}
                                helperText={errors.Email?.message}
                            />
                           
                            <LoadingButton
                                type="submit"
                                fullWidth
                                loading={loading}
                                variant="contained"
                                disabled={loading}
                                sx={{ mt: 2, mb: 2 }}
                            >
                                <span>Get Password</span>
                            </LoadingButton>
                        </Box>

                        
                        <p className="mt-3 text-sm text-center" >
                            Never mind! 
                            <Link href="/auth/login" className='ml-2 no-underline text-sm font-semibold color-primary'>
                            Take me back to login
                            </Link>
                        </p>
                        {
                         errMsg ?
                        <div className="mt-3 text-sm">
                            <MuiAlert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {errMsg}
                            </MuiAlert>
                        </div>
                        : <></>
                        }
                    </div>
                </div>
            </div>
            
        </div>
    )
}
