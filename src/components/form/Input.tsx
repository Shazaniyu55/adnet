import React,{useState} from 'react'
import { Field} from "formik";
import {TextField,Box,FormGroup,InputAdornment,IconButton} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomErrorMessage from './CustomErrorMessage';



function Input({name,label,type,required,helperText,autoComplete,values,fieldToCheckAgainst,valueOfFieldToCheckAgainst,...rest}:any) {
  const [hidePassword, setHidePassword] = useState(true);
  const [inputType, setInputType] = useState(type);
  
    const handleClickShowPassword = () =>{
      setHidePassword((hide) =>!hide)
      
      hidePassword ? setInputType('text') : setInputType('password')
    } 

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  return (
    <Box marginBottom={2}  marginTop={2}>
    <FormGroup>
        <Field type={inputType} name={name}
                as={TextField} label={label} disabled={valueOfFieldToCheckAgainst && values[fieldToCheckAgainst] === valueOfFieldToCheckAgainst}
                required={required} helperText={helperText}
                autoComplete={autoComplete} {...rest}
                size='small' margin='dense' InputLabelProps={{ shrink: true }} 
                InputProps={{
                      endAdornment: <InputAdornment position="end">
                      {type === 'password' &&  
                          <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {hidePassword ? <VisibilityIcon /> :<VisibilityOff /> }
                          </IconButton>
                      }
                    </InputAdornment>
                }}
                
        />
        <CustomErrorMessage name={name}/>
    </FormGroup>
    </Box>
  )
}

export default Input