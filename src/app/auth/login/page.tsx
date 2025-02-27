'use client';
import { Box, Button, TextField } from '@mui/material';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState, useEffect, useRef } from "react";
import { useForm } from 'react-hook-form';
import AlertTitle from '@mui/material/AlertTitle';
import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from '@/app/hooks/snackbar-service';
import getApiUrl from '../../../../config';
import { useRouter } from 'next/navigation';
import CredentialList from '../../admin/cred-list/page';

type formValues = {
    Username: string;
    // Password: string;
}

export default function Login() {
    const count = useRef(0);
    const router = useRouter();
    const { showMessage } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const sessionData = sessionStorage.getItem('session');
            if (sessionData) {
                router.push('/admin/cred-register');
            }
        }
    }, [router]);

    const form = useForm<formValues>({
        defaultValues: {
            Username: '',
            // Password: ''
        }
    });
    function Encode (data:any) {
        let str_g = btoa(data) + "CBPY!!!!mplY3Rd";
        str_g = encodeURIComponent(str_g);
        return str_g;
    }

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = async (data: formValues) => {
        setErrMsg('');
        setLoading(true);
        try {
            const response = await fetch(`${getApiUrl()}v1/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Username: data.Username,
                    // Password: data.Password
                })
            });

            const resultData = await response.json();

            if (response.ok && resultData.result.responseMessage === 'Logined Successfully') {
                sessionStorage.setItem('session', JSON.stringify(resultData.result));
                const role = resultData.result.response.fK_UserRole;
                const iD_PartyMember = resultData.result.response?.iD_PartyMember;
                sessionStorage.setItem("userid",iD_PartyMember)
             


                if (role === 1 ) {
                    router.push('/admin/cred-list');
                }
                    else if(role === 0){

                        router.push(`/admin/cred-register`)
                    
                } else {
                    showMessage('Access denied for this role', 'error');
                }
            } else {
                setErrMsg(resultData.result.responseMessage || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Something went wrong!', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (count.current === 0) {
            // Any initialization logic
        }
        count.current++;
    }, []);

    return (
        <div className="flex min-h-[calc(100vh-190px)] items-center justify-center">
            <div className='mt-20 lg:mt-0'>
                <div className="w-full flex-1">
                    <div className="mx-auto max-w-xs">
                        <h3 className="font-bold ">
                      Please Enter  Mobile Number To Sign In
                        </h3>
                      
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
                                label="Phone Number"
                                {...register("Username", { required: "Phone Number is required" })}
                                error={!!errors.Username}
                                helperText={errors.Username?.message}
                            />
                            {/* <TextField
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                {...register("Password", { required: "Password is required" })}
                                error={!!errors.Password}
                                helperText={errors.Password?.message}
                            /> */}
                            <LoadingButton
                                type="submit"
                                fullWidth
                                loading={loading}
                                variant="contained"
                                disabled={loading}
                                sx={{ mt: 2, mb: 2 }}
                            >
                                <span>Sign In</span>
                            </LoadingButton>
                        </Box>
                        <p className="mt-3 text-sm text-center">
                           
                            <Link prefetch={true} href="/auth/register" className='ml-2 no-underline text-sm font-semibold' style={{color:'var(--primary)'}}>
                              New Registration
                            </Link>
                        </p>
                        {errMsg && (
                            <div className="mt-3 text-sm">
                                <MuiAlert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {errMsg}
                                </MuiAlert>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
