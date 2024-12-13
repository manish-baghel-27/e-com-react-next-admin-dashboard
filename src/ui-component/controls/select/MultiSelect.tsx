import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { FormHelperText } from '@mui/material';

type propsType = {
  id: string,
  name: string,
  label: string,
  label_id: string,
  value: Array<object>,
  error: string,
  onChange: any,
  variant: any,
  children: any,
}

export default function MultiSelect(props: propsType) {
  const { 
    name, 
    label, 
    label_id, 
    id, 
    value, 
    error=null, 
    onChange,
    variant,
    children
  } = props;

  return (
    <>
      <FormControl 
        fullWidth
        variant={variant}
        {...(error && {error:true})}
      >
        <InputLabel id={label_id}>{label}</InputLabel>
        <Select
          labelId={label_id}
          id={id}
          name={name}
          multiple
          value={value}
          onChange={onChange}
          input={<OutlinedInput id={id} label={label} />}
          // renderValue={(selected) => (
          //   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          //     {selected.map((value: any) => (
          //       <Chip key={value} label={value} />
          //     ))}
          //   </Box>
          // )}
        >
          { children }
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </>
  );
}
