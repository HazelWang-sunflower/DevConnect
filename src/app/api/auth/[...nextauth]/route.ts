import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { use } from "react";

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
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "email", placeholder: "j@j.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials!.email || "",
            password: credentials!.password || "",
          }),
        });
        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  debug: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user, token }) {
      console.log("session", session);
      console.log("user", user);
      console.log("token", token);
      return session;
    },
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log("session", user);
      console.log("account", account);
      console.log("profile", profile);
      console.log("email", email);
      console.log("credentials", credentials);

      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
