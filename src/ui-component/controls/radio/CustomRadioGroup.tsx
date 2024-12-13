import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

export default function CustomRadioGroup(props: any) {
    const {id, name, label, value, onChange, items, ...other} = props;

    return (
        <FormControl  {...other}>
            <FormLabel id={id}>{label}</FormLabel>
            <RadioGroup 
                row
                aria-labelledby={id}
                name={name}
                value={value}
                onChange={onChange}
            >
                {
                    items.map(
                        (item: any,index: number)=>(
                            <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.name} />
                        )
                    )
                }
            </RadioGroup>
        </FormControl>
    )
}
