import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/shared/theme-provider";
import { Provider } from "../components/layout/provider";
import { Toaster } from "@/components/ui/toaster";

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
        </Provider>
      </body>
    </html>
  );
}
