import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextField, Box, FormGroup } from "@mui/material";

function DateControl({
  name,
  label,
  type = "date",
  required,
  helperText,
  autoComplete,
  valueOfFieldToCheckAgainst,
  fieldToCheckAgainst,values,
  ...rest
}: any) {
  return (
    <Box marginBottom={2} marginTop={2}>
      <FormGroup>
        {/* <FormLabel>{label}</FormLabel> */}
        <Field
          type={type}
          name={name}
          required={required}
          size="small"
          disabled={fieldToCheckAgainst && values[fieldToCheckAgainst] === valueOfFieldToCheckAgainst}
          helperText={helperText}
          margin="dense"
          label={label}
          autoComplete={autoComplete}
          InputLabelProps={{ shrink: true }}
          as={TextField}
          {...rest}
        />
        <ErrorMessage name={name} />
      </FormGroup>
    </Box>
  );
}

export default DateControl;
