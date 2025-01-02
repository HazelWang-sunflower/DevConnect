const api_url = "http://localhost:8080/api";

async function login(email: string, password: string) {
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
}

export { login };
