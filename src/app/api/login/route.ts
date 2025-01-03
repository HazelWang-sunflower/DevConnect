import { db } from "@vercel/postgres";

const client = await db.connect();
async function login(email: string, password: string) {
  const sql = `SELECT * FROM t_users WHERE email = $1 AND password = $2`;
  const data = await client.query(sql, [email, password]);
  console.log("data", data);
  return data.rowCount;
}

export async function POST(request: Request) {
  const { email, password } = await request.json();
  console.log("request", email);
  return login(email, password);
}
