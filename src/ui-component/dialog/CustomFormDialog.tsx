"use client"

import * as React from 'react';
import { Dialog, DialogTitle, Typography, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import { CustomComponents }  from '..';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setFormDialogOpen } from '@/lib/store/features/dialog/formDialogSlice';


export default function CustomFormDialog(props: any) {
    const formDialogData = useAppSelector((state)=>state.formDialog);
    const dispatch = useAppDispatch();

    const { children, size, isFullWidth = true } = props;

    const CustomIconButton = CustomComponents.CustomIconButton;

    return (
        <Dialog open={formDialogData.isOpen} maxWidth={size} fullWidth={isFullWidth} disableEnforceFocus>
            <DialogTitle>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>{formDialogData.dialogTitle}</Typography>
                    <CustomIconButton
                        aria-label="close"
                        onClick={
                            () => {
                                dispatch(setFormDialogOpen({ isOpen: false, title: ""}));
                            }
                        }
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme:any) => theme.palette.grey[500],
                        }}
                    >
                        <Close />
                    </CustomIconButton>
                </Box>
            </DialogTitle>
            {children}
        </Dialog>
    )
}