"use client";

import { useActionState } from "react";
import { login } from "@/services/actions/auth";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import SnackbarComponent from "../components/show-snackbar";

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form action={action}>
          <TextField
            fullWidth
            label="E-mail"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
          />
          {state?.errors?.email && <p>{state.errors.email}</p>}
          <TextField
            fullWidth
            label="Senha"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
          />
          {state?.errors?.password && (
            <div>
              <p>A senha deve conter:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={pending}
          >
            Entrar
          </Button>
        </form>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => {
            redirect("/signup");
          }}
        >
          Não tem uma conta? Cadastre-se
        </Button>
      </Box>
      {state?.error && <SnackbarComponent message={state?.error} />}
    </Container>
  );
}
