import React, { useState } from "react";
import { Field } from "formik";
import {
  TextField,
  Box,
  FormGroup,
  Typography,
  InputAdornment,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import CustomErrorMessage from "./CustomErrorMessage";
import axios from "axios";

function VerifyingPhone({
  name,
  label,
  required,
  helperText,
  autoComplete,
  values,
  errors,
  ...rest
}: any) {
  const [phoneInUseMsg, setPhoneInUseMsg] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);

  async function CheckIfPhoneIsInUse(phone: string) {
    let data, error;
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.SMNK_URL}api/users/phone-in-use/${phone}`,
      });
      data = await res.data;
    } catch (err: any) {
      error = err;
    }
    return { data, error };
  }
  return (
    <Box marginBottom={2} marginTop={2}>
      <FormGroup>
        <Field
          type="tel"
          name={name}
          as={TextField}
          label={label}
          required={required}
          helperText={helperText}
          autoComplete={autoComplete}
          {...rest}
          size="small"
          margin="dense"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {phoneVerified && <VerifiedIcon color="success" />}
              </InputAdornment>
            ),
          }}
          onBlur={async (e: any) => {
            if (!errors[name] && values.phone) {
              const { data, error } = await CheckIfPhoneIsInUse(values.phone);
              if (error) {
                console.log(error);
              }
              if (!data) {
                setPhoneInUseMsg("");
                setPhoneVerified(true);
              } else {
                setPhoneVerified(false);
                setPhoneInUseMsg(
                  "This phone number is already in use,choose another email"
                );
                errors.phone =
                  "This phone number is already in use,choose another email";
              }
            } else {
              setPhoneInUseMsg("");
              setPhoneVerified(false);
            }
          }}
        />

        {phoneInUseMsg && (
          <Typography variant="caption" color="error" maxWidth={"80%"}>
            {phoneInUseMsg}
          </Typography>
        )}

        <CustomErrorMessage name={name} />
      </FormGroup>
    </Box>
  );
}

export default VerifyingPhone;
