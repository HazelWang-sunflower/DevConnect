import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.REACT_APP_GITHUB_ID!,
      clientSecret: process.env.REACT_APP_GITHUB_SECRET!,
      httpOptions: {
        timeout: 50000,
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Name",
          type: "text",
          placeholder: "jsmith",
        },
        email: { label: "Email", type: "email", placeholder: "j@j.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            body: JSON.stringify({
              name: credentials?.username,
              email: credentials!.email || "",
              password: credentials!.password || "",
            }),
            headers: { "Content-Type": "application/json" },
          });
          if (!res.ok) {
            return null;
          }

          const user = await res.json();

          if (res.ok && user) {
            return user;
          } else {
            console.log("Login failed:", user);
            return null;
          }
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
  ],
  debug: true,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      console.log("session", token);
      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }

      return session;
    },
    async jwt({ token, user, account, trigger, session }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name; // user.username
      }
      if (trigger === "update") {
        token.name = session.user.name;
        console.log("trigger", session);
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      // console.log("jwt", user);
      // console.log("jwt", token);
      return token;
    },
    async signIn({ user, account, profile }) {
      console.log("signIn", user);
      // if github login user not exist, create a new user in db
      if (account!.provider === "github") {
        // const existingUser = await prisma.user.findUnique({
        //   where: { email: user.email! },
        // });
        // if (!existingUser) {
        //   await prisma.user.create({
        //     data: {
        //       email: user.email!,
        //       name: user.name || profile?.name,
        //       // 可以添加其他字段,如GitHub头像URL等
        //     },
        //   });
        // }
        return true;
      }
      if (user) {
        return true;
      }
      return false;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
