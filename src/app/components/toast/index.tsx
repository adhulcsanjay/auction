import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,
//   ref,
// ) {
//   return <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />;
// });

export default function Toast({ open, message, onClose, severity }: any) {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: any) => {
        if (reason === 'clickaway') {
            return;
        }

        onClose();
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal: 'right' }} sx={{ width: '100%' }}>
            <MuiAlert onClose={handleClose} severity={severity} elevation={6} variant="filled">
                {message}
            </MuiAlert>
        </Snackbar>
        // <Snackbar open={data?.open} autoHideDuration={5000} anchorOrigin={{ vertical:'top', horizontal: 'right' }} onClose={handleClose}>
        //     <Alert onClose={handleClose} severity={data?.type} sx={{ width: '100%' }}>
        //     {data?.message}
        //     </Alert>
        // </Snackbar>
    )
}
