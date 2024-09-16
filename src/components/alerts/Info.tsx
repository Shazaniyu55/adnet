import { Alert, Box } from "@mui/material";
import React from "react";
function InfoAlert({ message }: { message: string }) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      mt={2}
      minWidth={"100%"}
    >
      <Alert severity="info" sx={{ minWidth: "100%", maxWidth: "100%" }}>
        {message}!
      </Alert>
    </Box>
  );
}

export default InfoAlert;
