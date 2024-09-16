import { Alert, Box } from "@mui/material";
import React from "react";
function WarningAlert({ message }: { message: string }) {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} mt={'5rem'}>
      <Alert severity="warning">{message}!</Alert>
    </Box>
  );
}

export default WarningAlert;
