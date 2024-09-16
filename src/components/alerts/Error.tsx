import { Alert, Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

function ErrorAlert({ message }: { message?: string }) {
  const router = useRouter();
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      mt={"5rem"}
    >
      <Alert severity="error">
        {message
          ? message
          : "An Error occurred while feching data. Ensure you are connected to the internet and try again or refresh the page"}
        !
      </Alert>
      <Button
        sx={{ textTransform: "lowercase" }}
        onClick={() => {
          router.reload();
        }}
      >
        Try again
      </Button>
    </Box>
  );
}
export default ErrorAlert;
