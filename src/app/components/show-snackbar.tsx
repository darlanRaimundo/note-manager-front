import React from "react";
import { Snackbar, SnackbarCloseReason } from "@mui/material";

export interface TransitionProps {
  message: string;
}

export default function SnackbarComponent({ message }: TransitionProps) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      message={message}
      onClose={handleClose}
      autoHideDuration={3000}
    />
  );
}
