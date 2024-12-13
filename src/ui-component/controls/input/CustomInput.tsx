import { TextField } from "@mui/material";

export const CustomInput=(props: any)=>{
    const {name, label, value, error=null, onChange, ...other} = props;
    return(
        <>
            <TextField
                onChange={onChange} 
                value={value} 
                name={name}
                label={label} 
                variant="outlined"
                {...other}
                {...(error && {error:true, helperText:error})} 
            />
        </>
    )
}