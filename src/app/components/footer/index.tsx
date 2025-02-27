'use client'

import Image from "next/image"
import eventlogo from '@/public/img/eventlogo.png'
import voleegroLogo from '../../../public/img/voleegro-logo.svg'
import { usePathname } from "next/navigation"

export default function Footer() {
    return (
        <>
            {/* {
                usePathname() !== '/results' &&
                <div className='px-10 mb-1'>
                    <hr />
                </div>
            } */}
           
            <footer className='flex justify-between items-center px-10 py-2 bg-white sticky bottom-0 z-10'>
                <div>
                    {/* <div className='text-xs font-medium mr-1'>Powered By</div>
                    <a href='https://progressivetechies.org/' target='_blank'>
                        <Image
                            src={eventlogo}
                            width={100}
                            alt="EventSphere"
                        />
                    </a> */}
                </div>
                <div>
                    <div className='text-xs font-medium mr-1 mb-3'>Developed By</div>
                    <a href='https://voleergo.com/' target='_blank'>
                        <Image width={100}
                            src={voleegroLogo}
                            alt="Voleegro"
                        />
                    </a>
                </div>
            </footer>
        </>
    )
}
