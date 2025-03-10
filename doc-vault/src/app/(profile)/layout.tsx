import type { Metadata } from "next";

import "@/app/globals.css";
import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/Footer";

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
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar2 />
        <main className="flex-grow relative overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
