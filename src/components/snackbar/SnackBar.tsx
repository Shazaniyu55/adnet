import * as React from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { Alert, AlertColor } from "@mui/material";

export interface State extends SnackbarOrigin {
  open: boolean;
}

const SnackbarComponent = React.forwardRef(
  ({ msg, color }: { msg: string; color: AlertColor }, _ref) => {
    const [state, setState] = React.useState<State>({
      open: false,
      vertical: "top",
      horizontal: "center",
    });
    const { vertical, horizontal, open } = state;
    React.useImperativeHandle(_ref, () => ({
      handleClick: () => {
        setState({
          open: true,
          vertical: "top",
          horizontal: "center",
        });
      },
    }));

    const handleClose = () => {
      setState({ ...state, open: false });
    };

    return (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        sx={{position:'fixed',top:300}}
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity={color}
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    );
  }
);
SnackbarComponent.displayName = "SnackbarComponent";
export default SnackbarComponent;
