'use client';
import { useForm } from 'react-hook-form';
import axiosInterceptorInstance from '../../../../axiosInterceptorInstance';
import '../../../public/css/base.css';
import { userData } from '@/app/hooks/use-responsive';
import React, { useEffect, useState } from 'react';
import MyProfile from '@/app/components/my-profile/page';

type FormValues = {
    ID_Users: number;
    FirstName: string;
    LastName: string;
    MobileNumber: string;
};

export default function PasswordReset() {
    const [currentUser, setCurrentUser] = useState<any | null>(null);
    const userInfo = userData();
    console.log('userInfo:', userInfo);

    const form = useForm<FormValues>({
        defaultValues: {
            ID_Users: currentUser?.iD_Users || 0,
            FirstName: currentUser?.firstName || '',
            LastName: currentUser?.lastName || '',
            MobileNumber: '',
        },
    });

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const loginData: any = sessionStorage.getItem('session');
            const userId = JSON.parse(loginData)?.response?.iD_Users;

            if (userId) {
                const response = await axiosInterceptorInstance.get(`/v1/signup?id_Users=${userId}&createdBy=1`);
                if (response?.data?.result) {
                    const result = response.data.result[0];
                    setCurrentUser(result);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {currentUser ? <MyProfile formData={currentUser} /> : <p>Loading...</p>}
        </div>
    );
}
