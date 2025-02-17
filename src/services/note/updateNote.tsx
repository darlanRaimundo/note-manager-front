"use server";

import { Note } from "@/lib/definitions";

const { cookies } = await import("next/headers");

export async function updateNote(_id: string, note: Note) {
  const body = JSON.stringify({
    ...note,
  });

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  const headers = new Headers({
    "Content-type": "application/json",
    Authorization: `Bearer ${token?.value}`,
  });

  // Insert the user into the database calling an API
  const response = await fetch(`http://localhost:3000/note/${_id}`, {
    method: "PATCH",
    headers,
    body,
  });
  const data = await response.json();

  return data;
}
