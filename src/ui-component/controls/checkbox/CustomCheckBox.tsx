import { Checkbox as MuiCheckbox, FormControl, FormControlLabel } from '@mui/material'
import React from 'react'

export default function CustomCheckBox(props: any) {
    const {name, label, value, onChange} = props;

    const converToDefaultEventPara = (name: string, value: any) => ({
        target:{
            name, value
        }
    })

    return (
        <FormControl>
            <FormControlLabel 
            control={
                <MuiCheckbox 
                name={name}
                color="primary"
                checked={value}
                onChange={e=>onChange(converToDefaultEventPara(name, e.target.checked))}
                />
            } 
            label={label} />
        </FormControl>
    )
}
