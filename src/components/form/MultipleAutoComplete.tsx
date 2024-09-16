import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

type Option = {
  label: string;
};
export default function MultipleAutoComplete({
  options,
  placeholder,
  label,
  onChange,
}: {
  options: Option[];
  placeholder: string;
  onChange: (event: any, newValue: any) => void;
  label: string;
}) {
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        onChange={onChange}
        options={options}
        getOptionLabel={(option) => option.label}
        //defaultValue={[options[0]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={label}
            placeholder={placeholder}
          />
        )}
      />
    </Stack>
  );
}
