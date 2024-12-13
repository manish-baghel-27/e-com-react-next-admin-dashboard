import React from 'react';
import { 
    FormControl, 
    FormHelperText, 
    InputLabel, 
    MenuItem, 
    Select 
} from '@mui/material';

export default function CustomSelect(props: any) {
    const { name, label, label_id, id, value, error=null, onChange, options } = props;

    return (
        <FormControl
            fullWidth
            variant="outlined"
            {...(error && {error:true})}
        >
            <InputLabel id={label_id}>{label}</InputLabel>
            <Select
                labelId={label_id}
                id={id}
                name={name}
                value={value}
                label={label}
                onChange={onChange}    
            >
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        (item: any)=>(<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                    )
                }
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
