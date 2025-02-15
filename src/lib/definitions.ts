import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
    .trim(),
  email: z.string().email({ message: "Insira um e-mail válido" }).trim(),
  password: z
    .string()
    .min(8, { message: "Ter pelo menos 8 caracteres" })
    .regex(/[a-zA-Z]/, { message: "Conter pelo menos uma letra" })
    .regex(/[0-9]/, { message: "Conter pelo menos um número" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Conter pelo menos um caractere especial",
    })
    .trim(),
});

export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Insira um e-mail válido" }).trim(),
  password: z
    .string()
    .min(8, { message: "Ter pelo menos 8 caracteres" })
    .regex(/[a-zA-Z]/, { message: "Conter pelo menos uma letra" })
    .regex(/[0-9]/, { message: "Conter pelo menos um número" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Conter pelo menos um caractere especial",
    })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload = { userId: string; expiresAt: Date };
