import Image from "next/image";
import eventlogo from '@/public/img/Credential-Logo.svg'
import { CircularProgress } from "@mui/material";

export default function Loading() {
    return (
        <div className="flex min-h-[calc(100vh)] items-center justify-center">
            <div className='mt-20 mb-20 text-center'>
                <Image
                    src={eventlogo}
                    width={160}
                    alt="EventSphere"
                    style={{ margin: '0 auto'}}
                />
                <CircularProgress color="primary" size={30} sx={{mt: 2}}/>
            </div>
        </div>
    )
  }