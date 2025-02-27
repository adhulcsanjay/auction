'use client';
// import * as React from 'react';
// import { useState } from "react";
import { useForm } from 'react-hook-form';
import axiosInterceptorInstance from '../../../../axiosInterceptorInstance';
import '../../../public/css/base.css'
import { userData } from '@/app/hooks/use-responsive';
import React, { useEffect, useState, useRef } from 'react';
import MyProfile from '@/app/components/my-profile/page';

type formValues = {
    ID_Users: number;
    Password: string;
    RegistrationID: string;
    UserName: string;
    UserPassword: string;
    FirstName: string;
    LastName: string;
    DateOfBirth: string;
    MobileNumber: string;
    Email: string;
    CompanyEmail: string;
    FK_UserRole: number;
    FK_Company: number;
    IDProof: string;
    FK_UserImages: number,
    TmpCompany: string,
    EmployeeID: string,
}

export default function PasswordReset() {
    const [currentUser, setCurrentUser] = useState<any>();
    const count = useRef(0);
    const userInfo = userData();

    const form = useForm<formValues>({
        defaultValues: {
            ID_Users: currentUser?.iD_Users,
            Password: '',
            RegistrationID: '',
            UserName: '',
            UserPassword: '',
            FirstName: currentUser?.firstName,
            LastName:  currentUser?.lastName,
            DateOfBirth: '',
            MobileNumber: '',
            Email: '',
            CompanyEmail: '',
            FK_UserRole: 0,
            FK_Company: 0,
            IDProof: '',
            FK_UserImages: 0,
            TmpCompany: '',
            EmployeeID: ''
        }
    });

    useEffect(() => {
      if (count.current === 0) {  
        getUser();
      }
      count.current++;
	}, []);

      const getUser = async () => {
        try {
          const loginData: any = sessionStorage.getItem('session');
          const userId = JSON.parse(loginData).response?.iD_Users;;
          
          const response = await axiosInterceptorInstance.get(`/v1/signup?id_Users=${userInfo.iD_Users}&createdBy=1`); 
          if(response?.data){
            const result = response.data.result[0];
            setCurrentUser(result);
          }
        } catch (error) {
          console.error(error);
        }
      };
    return (
        currentUser && 
            <MyProfile formData={currentUser} />
    )
}
