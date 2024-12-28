import { NextResponse } from "next/server";

const cliendId = process.env.REACT_APP_GITHUB_ID!;
const clientSecret = process.env.REACT_APP_GITHUB_SECRET!;
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    try {
      const tokenResponse = await fetch(
        "https://github.com/login/oauth/access_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            client_id: cliendId,
            client_secret: clientSecret,
            code,
          }),
        }
      );
      const tokenData = await tokenResponse.json();

      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      });
      const userData = await userResponse.json();
      // handle the user data, eg. save to database or create session
      console.log("userData", userData);

      return NextResponse.redirect("http://localhost:3000"); // 重定向到成功登录后的页面
    } catch (error) {
      console.error("Error during GitHub auth:", error);
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }
}
