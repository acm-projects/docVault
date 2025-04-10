import "@/app/globals.css";
import NavbarAcc from "@/components/NavbarAcc";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/UserContext";
import { Metadata } from "next";

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
    <UserProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <NavbarAcc/>
          <main className="flex-grow relative overflow-hidden">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </UserProvider>
  );
}
