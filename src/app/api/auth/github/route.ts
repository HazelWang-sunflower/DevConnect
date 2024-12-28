import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.REACT_APP_GITHUB_ID;
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`;
  return NextResponse.redirect(githubAuthUrl);
}
