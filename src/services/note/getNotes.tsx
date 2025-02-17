"use server";

const { cookies } = await import("next/headers");

export async function getNotes(userId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  const headers = new Headers({
    "Content-type": "application/json",
    Authorization: `Bearer ${token?.value}`,
  });

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/note/${userId}`,
    {
      method: "GET",
      credentials: "same-origin",
      headers,
    }
  );

  const data = await response.json();

  return data;
}
