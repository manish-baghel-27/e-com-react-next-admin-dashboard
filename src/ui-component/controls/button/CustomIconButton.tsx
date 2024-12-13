import { IconButton } from '@mui/material'
import React from 'react'

export default function CustomIconButton(props: any) {
    const { ...others } = props;
    return (
        <>
            <IconButton {...others} color='primary'>
                {props.children}
            </IconButton>
        </>
    )
}
