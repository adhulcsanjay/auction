'use client';
import { Box, Button, Card, CardContent, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '@/app/hooks/snackbar-service';
import axiosInterceptorInstance from '../../../../axiosInterceptorInstance';

type FormValues = {
  ID_Users: number;
  Password: string;
  RegistrationID: string;
  UserName: string;
  UserPassword: string;
  FirstName: string;
  LastName: string;
 
  MobileNumber: string;
  Email: string;
  
  FK_UserRole: number;
};

export default function SimplifiedUserRegister() {
  const { showMessage } = useSnackbar();
  const router = useRouter();
  const [errMsg, setErrMsg] = useState('');

  const form = useForm<FormValues>({
    defaultValues: {
      ID_Users: 0,
            Password: '',
            RegistrationID: '',
            UserName: '',
            UserPassword: '',
            FirstName: '',
            LastName: '',
           
            MobileNumber: '',
            Email: '',
          
            FK_UserRole: 0,
           
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    const payload = {
      ID_Users: 0,
      Password: null,
      RegistrationID: null,
      UserName: null,
      UserPassword: data.UserPassword,
      FirstName: data.FirstName,
      LastName: data.LastName,
      MobileNumber: data.MobileNumber,
      Email: data.Email,
      FK_UserRole: 0,
     
    };

    setErrMsg('');
    try {
      const response = await axiosInterceptorInstance.post(`/v1/signup`, payload);
      if (response?.data) {
        const result = response.data.result;
        if (result.responseStatus) {
          showMessage(result.responseMessage, 'success');
          router.push(`/admin/cred-register`);
        } else {
          setErrMsg(result.responseMessage);
        }
      }
    } catch (error: any) {
      showMessage(error.message, 'error');
      setErrMsg(error.message);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-164px)] items-center justify-center">
    <Card
      sx={{
        maxWidth: 400,
        width: '100%',
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <div className="w-full">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold color-primary">Register</h1>
          <p className="text-sm">Please enter user details</p>
        </div>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <div className="grid grid-cols-1 gap-4">
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              id="fname"
              label="First Name"
              {...register('FirstName', {
                required: 'Name is required',
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
                required: 'Name is required',
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: 'Invalid name format',
                },
              })}
              error={!!errors.LastName}
              helperText={errors.LastName?.message}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              {...register('Email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.Email}
              helperText={errors.Email?.message}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Mobile Number"
              {...register('MobileNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Invalid phone number',
                },
              })}
              error={!!errors.MobileNumber}
              helperText={errors.MobileNumber?.message}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              label="Password"
              {...register('UserPassword', {
                required: 'Password is required',
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
                  message:
                    'Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*()_+)',
                },
              })}
              error={!!errors.UserPassword}
              helperText={errors.UserPassword?.message}
            />
          </div>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          {errMsg && (
            <p className="mt-3 text-sm text-red-500">
              <strong>Error:</strong> {errMsg}
            </p>
          )}
        </Box>
      
      </div>
    </Card>
  </div>
  )}  