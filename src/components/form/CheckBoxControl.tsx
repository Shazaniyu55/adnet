import React from "react";
import { ErrorMessage, Field } from "formik";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import CustomErrorMessage from "./CustomErrorMessage";

export type CheckboxOption={
  label:string, value:string
}
function CheckBoxControl({
  name,
  options,
  checked,
  ...rest
}: {
  name: string;
  options: CheckboxOption[];
  checked:boolean
}) {
  return (
    <Box marginBottom={2}>
      {Array.isArray(options) &&
        options.map((option, i) => (
          <Field
            key={i}
            name={name}
            as={FormControlLabel}
            value={option.value}
            control={<Checkbox 
            defaultChecked ={checked}
            />}
            label={option.label}
            {...rest}
          />
        ))}
         <CustomErrorMessage name={name}/>
    </Box>
  );
}

export default CheckBoxControl;
