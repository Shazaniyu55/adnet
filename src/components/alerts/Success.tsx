import { Alert,Box } from "@mui/material";
import React from "react";


function SuccessAlert({ message }: { message: string }) {
    return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} mt={'5rem'}>
        <Alert severity="success">{message}!</Alert>
      </Box>
    )
}

export default SuccessAlert;
