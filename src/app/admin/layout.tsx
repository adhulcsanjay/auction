'use client';

import DashboardLayout from "../layout/dashboard";
import * as CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';
import { userData } from "../hooks/use-responsive";
// import Dashboard from "../user/dashboard/page";
import { useRouter } from 'next/navigation';
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const key = CryptoJS.enc.Utf8.parse('DHJKHJKLMNOMGSTRPROKMEGISX345VLG'); // Ensure this is a valid key (32 bytes for AES-256)
  const iv = CryptoJS.enc.Utf8.parse('ZPDHJKHJKLMOPVLG'); // Ensure this is 16 bytes for AES-CBC
  const userInfo = userData();
  const [userRole, setUserRole] = useState<number | null>(null); // Default to null for loading state
const router= useRouter();
  const decryptUsingAES256 = (encryptedString: string): number | null => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedString, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
      return Number(decryptedString) || null; // Ensure a valid number is returned
    } catch (error) {
      console.error("Decryption failed:", error);
      return null; // Return null if decryption fails
    }
  };

  useEffect(() => {
    if (userInfo?.fK_UserRoleStr) {
      const role = decryptUsingAES256(userInfo.fK_UserRoleStr);
      setUserRole(role);
    } else {
      setUserRole(null); // Handle case where userInfo or fK_UserRoleStr is invalid
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  // if (userRole === null) {
  //   return <div>Loading...</div>; // Show a loading state while userRole is being determined
  // }

  // return userRole === 1 ? (
  //   <DashboardLayout>{children}</DashboardLayout>
  // ) : (
  //       <Dashboard>{children}</Dashboard>

  // );

  return (
    <DashboardLayout>{children}</DashboardLayout>
  ) 
}
