import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              {children}
              <Footer />
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
