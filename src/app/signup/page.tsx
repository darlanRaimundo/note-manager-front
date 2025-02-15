"use client";

import { signup } from "@/services/actions/auth";
import { useActionState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { redirect } from "next/navigation";

export default function Page() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Cadastro
        </Typography>
        <form action={action}>
          <TextField
            fullWidth
            label="Nome"
            name="name"
            variant="outlined"
            margin="normal"
          />
          {state?.errors?.name && <p>{state.errors.name}</p>}
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
            Cadastrar
          </Button>
        </form>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => {
            redirect("/login");
          }}
        >
          Já tem uma conta? Faça Login
        </Button>
      </Box>
    </Container>
  );
}
