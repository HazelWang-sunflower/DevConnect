"use client";

import { SessionProvider, useSession } from "next-auth/react";

export function Provider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
