'use client';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';


export default function Response() {
    const [value, setValue] = useState<any>();
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const paramValue = queryParams.get('regID');
        setValue(paramValue);
      }, []);
    return (
        <div className="flex min-h-[calc(100vh-148px)] items-center justify-center bg-white-100">
         <div >
        <div className="w-full flex-1">
            <div className="mx-auto max-w-md bg-white shadow-lg rounded-lg p-1">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Thank you!
                </h1>
                <p className='text-sm text-gray-600 text-center '>
                    Your registration was successful.
                </p>
                
                <p className='text-sm text-center'>
                    Go to
                    <Link href="/auth/login" className='ml-2 no-underline text-sm font-semibold text-blue-600 hover:text-blue-800'>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    </div>
</div>
    )
}
