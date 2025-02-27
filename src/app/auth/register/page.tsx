'use client';

import { Box, Button, TextField, AlertTitle, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import MuiAlert from '@mui/material/Alert';
import { useSnackbar } from '@/app/hooks/snackbar-service';
import axiosInterceptorInstance from '../../../../axiosInterceptorInstance';

type FormValues = {
  Password: any;
  ID_Users: number;
  FK_State: number;
  RegistrationID: string;
  UserName: string;
  UserPassword: string;
  FirstName: string;
  LastName: string;
  MobileNumber: string;
  FK_UserRole: number;
  FK_UserImages: number;
};

type State = {
  ID: number;
  NAME: string;
};

export default function Register() {
  const count = useRef(0);
  const { showMessage } = useSnackbar();
  const [states, setStates] = useState<State[]>([]);
  const [errMsg, setErrMsg] = useState('');
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      ID_Users: 0,
      FK_State: 0,
      RegistrationID: '',
      UserName: '',
      UserPassword: '',
      FirstName: '',
      LastName: '',
      MobileNumber: '',
      FK_UserRole: 0,
      FK_UserImages: 0,
    },
  });

  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  useEffect(() => {
    if (count.current === 0) {
      fetchStates(); // Fetch the states data from the API on component load
    }
    count.current++;
  }, []);

  const fetchStates = async () => {
    try {
      const response = await axiosInterceptorInstance.get(`/v1/DropDownData`);
      if (response.data) {
        const data = JSON.parse(response.data.result);
        setStates(data.State); // Directly set states
      }
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };
  

  const onSubmit = async (data: FormValues) => {
    try {
      const registerResponse = await axiosInterceptorInstance.post(`v1/signup`, data);
      if (registerResponse?.data) {
        const registerResult = registerResponse.data.result;
        if (registerResult.responseStatus) {
          showMessage(registerResult.responseMessage, 'success');
  
          const loginResponse = await axiosInterceptorInstance.post(`v1/login`, {
            Username: data.MobileNumber,
       
          });
  
          if (loginResponse?.data) {
            const loginResult = loginResponse.data.result;
            if (loginResult.responseMessage === 'Logined Successfully') {
              sessionStorage.setItem('session', JSON.stringify(loginResult));
              const role = loginResult.response.fK_UserRole;
  
              if (role === 1 || role === 0) {
                router.push('/admin/cred-register');
              } else {
                showMessage('Access denied for this role', 'error');
              }
            } else {
              setErrMsg(loginResult.responseMessage || 'Login failed');
            }
          }
        } else {
          setErrMsg(registerResult.responseMessage);
        }
      }
    } catch (error: any) {
      showMessage(error.message || 'An error occurred', 'error');
      console.error(error);
    }
  };
  

  const isNotBlank = (value: string) => {
    return value.trim() === '' ? 'Field cannot be empty or contain only spaces' : true;
  };

  return (
    <div className="flex min-h-[calc(100vh-190px)] items-center justify-center p-5">
    <div className="mt-20 lg:mt-10">
      <div className="mx-auto max-w-md">
       
        <h3 className="font-bold">Please enter your details</h3>
      </div>
      <form className="mx-auto max-w-md mt-4 mb-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-1 ">
          <TextField
            size="small"
            margin="normal"
            fullWidth
            label=" Name"
            {...register('FirstName', {
              required: ' Name is required',
              validate: isNotBlank,
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: 'Invalid name format',
              },
            })}
            error={!!errors.FirstName}
            helperText={errors.FirstName?.message}
          />
          {/* <TextField
            size="small"
            margin="normal"
            fullWidth
            label="Last Name"
            {...register('LastName', {
              required: 'Last name is required',
              validate: isNotBlank,
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: 'Invalid name format',
              },
            })}
            error={!!errors.LastName}
            helperText={errors.LastName?.message}
          /> */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TextField
            size="small"
            margin="normal"
            fullWidth
            label="Mobile Number"
            {...register('MobileNumber', {
              required: 'Mobile number is required',
              validate: isNotBlank,
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Invalid mobile number',
              },
            })}
            error={!!errors.MobileNumber}
            helperText={errors.MobileNumber?.message}
          />
                    <FormControl fullWidth margin="normal" size="small" error={!!errors.FK_State}>
              <InputLabel id="state-select-label">State</InputLabel>
              <Select
                labelId="state-select-label"
                value={form.watch('FK_State')} 
                label="State"
                {...register('FK_State', {
                  required: 'State is required',
                })}
                onChange={(event) => setValue('FK_State', Number(event.target.value), { shouldValidate: true })}
              >
                <MenuItem value={0} disabled>
                  Select State
                </MenuItem>
                {states.map((state) => (
                  <MenuItem key={state.ID} value={state.ID}>
                    {state.NAME}
                  </MenuItem>
                ))}
              </Select>
              {errors.FK_State && <FormHelperText>{errors.FK_State.message}</FormHelperText>}
            </FormControl>

   </div>
  
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Register
        </Button>
        <p className="mt-3 text-sm text-center">
          Already have an account?
          <Link href="/auth/login" className="ml-2 no-underline text-sm font-semibold" style={{color:'var(--primary)'}}>
            Sign In
          </Link>
        </p>
        {errMsg && (
          <MuiAlert severity="error" className="mt-3 text-sm">
            <AlertTitle>Error</AlertTitle>
            {errMsg}
          </MuiAlert>
        )}
      </form>
    </div>
  </div>
  )  }