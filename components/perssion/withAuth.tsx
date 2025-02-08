"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserPermissions = {
  canAccess: boolean;
};

const getUserPermissions = (): UserPermissions => {
  return { canAccess: false };
};

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuth(props: P) {
    const router = useRouter();
    const [userPermissions, setUserPermissions] =
      useState<UserPermissions | null>(null);

    useEffect(() => {
      const permissions = getUserPermissions();
      setUserPermissions(permissions);

      if (!permissions.canAccess) {
        router.push("/unauthorized");
      }
    }, [router]);

    if (userPermissions === null) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}
