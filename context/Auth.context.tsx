import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { createContext } from "react";

const AuthContext = createContext<any>(null);
const AuthProvider = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
