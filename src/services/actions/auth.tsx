import {
  SignupFormSchema,
  FormState,
  SigninFormSchema,
} from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Prepare the request body
  const body = JSON.stringify({
    name: validatedFields.data.name,
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });
  console.log(process.env.REACT_APP_API_URL);
  // Insert the user into the database calling an API
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  if (!data.access_token) {
    return { error: data.message };
  } else {
    // Create user session
    await createSession(data.access_token);
    redirect("/manager");
  }
}

export async function login(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Prepare the request body
  const body = JSON.stringify({
    email: validatedFields.data?.email,
    password: validatedFields.data?.password,
  });

  // Log the user calling an API
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  if (!data.access_token) {
    return { error: data.message };
  } else {
    // Create user session
    await createSession(data.access_token);
    redirect("/manager");
  }
}

export async function logout() {
  deleteSession();
  redirect("/login");
}
