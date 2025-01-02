import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.REACT_APP_GITHUB_ID!,
      clientSecret: process.env.REACT_APP_GITHUB_SECRET!,
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
      // need user in to store the DB
      return session;
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      // if (account) {
      //   token.accessToken = account.access_token;
      //   token.id = profile?.id;
      // }
      console.log("account", account);
      console.log("profile", profile);
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
});
export { handler as GET, handler as POST };
