import React from 'react'
import { Field} from "formik";
import {TextField,Box,FormGroup} from "@mui/material";
import CustomErrorMessage from './CustomErrorMessage';


function NumberComponent({name,label,required,helperText,...rest}:any) {

  return (
    <Box marginBottom={2}  marginTop={2}>
    <FormGroup>
        <Field  name={name} as={TextField}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                size='small'margin='dense' required={required}
                helperText={helperText} InputLabelProps={{ shrink: true }} 
                label={label} {...rest}/>
       <CustomErrorMessage name={name}/>
    </FormGroup>
    </Box>
  )
}

export default NumberComponent