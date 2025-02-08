"use client";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  username: string;
  updateUsername: (newUsername: string) => void;
};

const UserContext = createContext<UserContextType>({
  username: "",
  updateUsername: () => {},
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status, update } = useSession();

  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.name) {
      setUsername(session.user.name);
    }
  }, [session, status]);

  // 更新用户名并同步到 sessionStorage
  const updateUsername = async (newUsername: string) => {
    // setUsername(newUsername);
    // await update({ ...session, user: { ...session?.user, name: newUsername } });
    try {
      setUsername(newUsername);
      const newSession = {
        ...session,
        user: { ...session?.user, name: newUsername },
      };
      await update(newSession);
    } catch (error) {
      console.error("Failed to update username:", error);
    }
  };

  return (
    <UserContext.Provider value={{ username, updateUsername }}>
      {children}
    </UserContext.Provider>
  );
}

// 自定义 Hook 方便使用
export const useUser = () => useContext(UserContext);
