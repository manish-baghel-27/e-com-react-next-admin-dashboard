import { Button } from '@mui/material';
import React from 'react'

export default function CustomActionButton(props: any) {
    const { color, children, onClick } = props;

    return (
        <Button
            onClick={onClick}>
            {children}
        </Button>
    )
}