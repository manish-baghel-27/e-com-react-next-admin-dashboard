import { useAppSelector } from '@/lib/store/hooks';
import { Button, CircularProgress } from '@mui/material';
import React from 'react'

export default function CustomButton(props: any) {
  const { text, size, color, variant, ...other } = props;

  const isTaskLoading = useAppSelector((state)=> state.loader.taskLoader);

  return (
    <>
      <Button
        variant={variant || "contained"}
        size={size || "medium"}
        color={color || "primary"}
        sx={{ borderRadius: '16px' }}
        {...other}
        disabled = {isTaskLoading}
      >
        {text}
        {isTaskLoading && <CircularProgress color="inherit" size={20}/>}
      </Button>
    </>
  )
}
