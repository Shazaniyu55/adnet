import * as React from "react";
import { FormControlLabel, Switch, Box } from "@mui/material";
import { Field } from "formik";
import CustomErrorMessage from "./CustomErrorMessage";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function SwitchComponent({
  values,
  name,
  checked,
  label,
  helperText,
  ...rest
}: any) {
  return (
    <>
      <Box>
        <Field
          name={name}
          as={FormControlLabel}
          control={<Switch checked={values[name]} />}
          labelPlacement="start"
        />
        <label
          onClick={() => {
            localStorage.setItem("values", JSON.stringify(values));
          }}
          style={{ marginLeft: "1rem" }}
        >
          {label}
        </label>
      </Box>

      <CustomErrorMessage name={name} />
    </>
  );
}
