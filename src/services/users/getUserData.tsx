"use server";
const { cookies } = await import("next/headers");

export async function getUserData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  const headers = new Headers({
    "Content-type": "application/json",
    Authorization: `Bearer ${token?.value}`,
  });
  const response = await fetch("http://localhost:3000/auth/profile", {
    method: "GET",
    credentials: "same-origin",
    headers,
  });

  const data = await response.json();

  return data.sub;
}
