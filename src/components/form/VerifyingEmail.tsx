import React, { useState } from "react";
import { Field } from "formik";
import {
  TextField,
  Box,
  FormGroup,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import CustomErrorMessage from "./CustomErrorMessage";
import emailjs from "@emailjs/browser";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

function VerifyingEmail({
  name,
  label,
  emailVerificationCode,
  required,
  helperText,
  autoComplete,
  values,
  errors,
  ...rest
}: any) {
  const [emailVerifyingMsg, setEmailVerifyingMsg] = useState("");
  const [emailInUseMsg, setEmailInUseMsg] = useState("");
  const [sendingCode, setSendingCode] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  function SendEmail() {
    setSendingCode(true);
    setEmailVerifyingMsg("");
    setEmailVerified(false);
    emailjs
      .send(
        "service_l0apj59",
        "smnk_verify_email",
        {
          to_name: values.email,
          message: `Your email verification code is ${emailVerificationCode}`,
          from_name: "SMNK Nig Ltd",
        },
        "X1uWzzlDGGXJyMl09"
      )
      .then((response) => {
        if (response.status === 200) {
          setEmailVerified(true);
          setSendingCode(false);
          setEmailVerifyingMsg(
            "Your email verification code has been sent to your email"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setEmailVerified(false);
        setSendingCode(false);
        setEmailInUseMsg(
          "An error occurred while sending your verification code,Please ensure you are connected to the internet"
        );
        // SendEmail(
        //   values.email,
        //   emailVerificationCode,
        //   setSendingCode,
        //   setEmailVerifyingMsg
        // );
      });
  }
  async function CheckIfEmailIsInUse(email: string) {
    let data, error;
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.SMNK_URL}api/users/email-in-use/${email}`,
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
          type="email"
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
                {emailVerified && <VerifiedIcon />}
              </InputAdornment>
            ),
          }}
          onBlur={async (e: any) => {
            if (!errors[name] && values.email) {
              const { data, error } = await CheckIfEmailIsInUse(values.email);
              if (error) {
                setEmailInUseMsg(
                  "Error occured while checking if your email is already in use,ensure you are connected or refresh this page"
                );
              }
              if (!data) {
                setEmailInUseMsg("");
                SendEmail();
              } else {
                setEmailInUseMsg(
                  "This email is already in use,choose another email"
                );
              }
            } else {
              setEmailInUseMsg("");
            }
          }}
        />
        {sendingCode && (
          <LoadingButton
            loading={sendingCode}
            size="small"
            color="primary"
            sx={{ fontSize: 10, textTransform: "capitalize" }}
            loadingPosition="start"
            variant="outlined"
          >
            sending verification code to your email
          </LoadingButton>
        )}
        {emailInUseMsg && (
          <Typography variant="caption" color="error" maxWidth={"80%"}>
            {emailInUseMsg}
          </Typography>
        )}
        {emailVerifyingMsg && (
          <>
            {" "}
            <Typography variant="caption" color="primary" maxWidth={"80%"}>
              {emailVerifyingMsg}
            </Typography>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              <Typography
                variant="caption"
                component="i"
              >{`Didn't get it?`}</Typography>
              <Button
                sx={{ textTransform: "capitalize" }}
                onClick={() => {
                  SendEmail();
                }}
              >
                Resend
              </Button>
            </Box>
          </>
        )}
        <CustomErrorMessage name={name} />
      </FormGroup>
    </Box>
  );
}

export default VerifyingEmail;
