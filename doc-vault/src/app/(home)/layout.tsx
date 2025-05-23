import type { Metadata } from "next";

import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "docVault",
  description: "A Document Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow relative overflow-hidden">
          <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}