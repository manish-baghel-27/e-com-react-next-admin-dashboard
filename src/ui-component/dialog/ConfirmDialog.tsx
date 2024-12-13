import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { CustomComponents } from '..';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setConfirmDialogState } from '@/lib/store/features/dialog/confirmDialogSlice';


export default function ConfirmDialog() {
    const getStateData = useAppSelector(state => state.confirmDialog);
    const dispatch = useAppDispatch();

    const CustomButton = CustomComponents.CustomButton;

    return (
        <Dialog open={getStateData.isOpen}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>
            </DialogTitle>
            <DialogContent>
                <Typography variant='h6'>
                    {getStateData.title}
                </Typography>
                <Typography variant='subtitle2'>
                    {getStateData.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions>
                <CustomButton
                    sx={{ borderRadius: '10px' }}
                    text="Yes"
                    color="error"
                    size="medium"
                    variant="contained"
                    onClick={() => (
                        dispatch(
                            setConfirmDialogState({ isOpenConfirmDialog: false, confirmDialogTitle: '', confirmDialogSubTitle: '' })
                        ), 
                        getStateData.onConfirm()
                    )}
                />
                <CustomButton
                    sx={{ borderRadius: '10px' }}
                    text="No"
                    size="medium"
                    variant="outlined"
                    onClick={() =>
                        dispatch(setConfirmDialogState({isOpenConfirmDialog: false, confirmDialogTitle: '', confirmDialogSubTitle: ''}))
                    }
                />
            </DialogActions>
        </Dialog>
    )
}
