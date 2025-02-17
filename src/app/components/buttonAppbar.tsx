import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { logout } from "@/services/actions/auth";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notas
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              logout();
            }}
          >
            SAIR
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
