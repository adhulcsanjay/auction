'use client'

import { Button } from "@mui/material"
import Image from "next/image"
import eventlogo from '@/public/img/eventlogo.png'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Link from "next/link";
import { usePathname } from "next/navigation";
import credentiallogo from '../../../public/img/cpim-logo-new.svg'

export default function Header() {
    return (
        <header className='flex justify-between px-10 pt-2 pb-2 sticky bg-white top-0 z-10'>
            <div className='logo font-medium'>
                <a href='#' target='_blank'>
                    <Image style={{width:'5rem'}}
                        src={credentiallogo}
                        alt="credentiallogo"
                    />
                </a>
                <h1 className="text-3xl mt-5" style={{fontWeight:'700',color:'var(--primary)'}}>Credential Registration</h1>
            </div>
            {/* <nav>
                <Link href={usePathname() === '/results' ? '/auth/login' : '/results'}>
                    <Button variant="outlined" endIcon={<ArrowOutwardIcon />}>{usePathname() === '/results' ? 'Login' : 'Results'}</Button>
                </Link>
            </nav> */}
        </header>
    )
}
