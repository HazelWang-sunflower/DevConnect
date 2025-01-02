import { NextResponse } from "next/server";

const api_url = "http://localhost:8080/api";

export default async function POST(email: string, password: string) {
  const loginResp = await fetch(`${api_url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      username: email,
      password: password,
    }),
  });
  const res = await loginResp.json();

  console.log("res", res);
  return NextResponse.json(res);
}
