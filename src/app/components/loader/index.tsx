'use client'

import { Backdrop, CircularProgress } from "@mui/material"


export default function Loader() {
    return (
        <Backdrop
            sx={{ color: 'var(--primary)', zIndex: (theme) => theme.zIndex.appBar - 1 }}
            open={true}
        >
            <CircularProgress color="inherit" size={30}/>
        </Backdrop>
    )
}
