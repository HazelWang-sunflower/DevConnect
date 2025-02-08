import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/shared/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { UserContextProvider } from "@/context/userContext";
import { Provider } from "@/components/layout/provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevConnect",
  description: "A social platform for developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
          <UserContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div id="root" className="flex flex-col min-h-screen">
                {children}
              </div>
              <Toaster />
            </ThemeProvider>
          </UserContextProvider>
        </Provider>
      </body>
    </html>
  );
}
