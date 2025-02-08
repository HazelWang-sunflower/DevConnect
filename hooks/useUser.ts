import useSWR from "swr";
import { useSession } from "next-auth/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUser() {
  const { data: session, status } = useSession();
  const { data: user, mutate } = useSWR(
    session ? "/api/account" : null,
    fetcher
  );

  const updateUsername = async (newUsername: string) => {
    try {
      const updatedUser = await fetch("/api/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newUsername }),
      }).then((res) => res.json());

      mutate(updatedUser, false); // 更新本地数据，不重新验证
    } catch (error) {
      console.error("Failed to update username:", error);
    }
  };

  return {
    user,
    updateUsername,
    isLoading: status === "loading" || (!user && status === "authenticated"),
    isError: status === "unauthenticated",
  };
}
