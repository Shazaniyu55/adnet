import { Box } from '@mui/material'
import React from 'react'
import { ErrorMessage} from "formik";


function CustomErrorMessage({name}:{name:string}) {
  return (
    <Box color={'red'}>
      <ErrorMessage name={name}/>
      </Box>
  )
}

export default CustomErrorMessage