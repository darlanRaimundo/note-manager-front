"use server";

const { cookies } = await import("next/headers");

export async function deleteNote(_id?: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  const headers = new Headers({
    Authorization: `Bearer ${token?.value}`,
  });

  // Insert the user into the database calling an API
  const response = await fetch(`${process.env.REACT_APP_API_URL}/note/${_id}`, {
    method: "DELETE",
    headers,
  });

  const data = await response.json();

  return data;
}
