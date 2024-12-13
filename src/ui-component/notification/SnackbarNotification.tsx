import React from 'react'
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setNotification } from '@/lib/store/features/notification/notificationSlice';


export default function SnackbarNotification(props: any) {
    const notificationData = useAppSelector((state)=>state.notification);
    const dispatch = useAppDispatch();
    
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string)=>{
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setNotification({isOpenSnackbar:false, messageText:'', getSeverity: ''}))
    }
    
    return (
        <Snackbar 
            open={notificationData.isOpenSnackbar} 
            autoHideDuration={3000}
            anchorOrigin={{
                vertical:'top',
                horizontal:'right'
            }}
            onClose={handleClose}>
            <Alert 
                variant="filled"
                onClose={handleClose}
                severity={notificationData.getSeverity}>
                {notificationData.messageText}
            </Alert>
        </Snackbar>
    )
}