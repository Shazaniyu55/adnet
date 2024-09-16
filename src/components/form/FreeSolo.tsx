import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Field } from "formik";
import { Box } from "@mui/material";
import CustomErrorMessage from "./CustomErrorMessage";

type Option = {
  label: string;
};
export default function FreeSoloAutocomplete({
  name,
  label,
  values,
  required,
  helperText,
  options = [],
  ...rest
}: {
  name: string;
  required: boolean;
  label: string;
  helperText: string;
  values: any;
  options: Option[];
}) {
  const [value, setValue] = React.useState(values[name]);
  const [textValue, setTextValue] = React.useState("");

  const handleChange = (e: any, form: any) => {
    const newValue = e.target.value;
    setValue(newValue);

    form.values[name] = newValue;
    form.resetForm(form);
  };

  return (
    <Box>
      <Field name={name}>
        {(props: any) => {
          const { form } = props;
          return (
            <Autocomplete
              sx={{ marginBottom: "1rem" }}
              freeSolo
              id={name}
              disableClearable
              options={options.map((option) => option.label ?? option)}
              value={value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  required={required}
                  helperText={helperText}
                  value={textValue}
                  name={name}
                  onBlur={(e) => {
                    handleChange(e, form);
                  }}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          );
        }}
      </Field>
      <CustomErrorMessage name={name} />
    </Box>
  );
}
