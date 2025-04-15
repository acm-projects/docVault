import type { Metadata } from "next";

import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import NavbarSearch from "@/components/NavbarSearch";
import Personal from "./personal/page";
import School from "./school/page";
import Work from "./work/page";
import { UserProvider } from "@/context/UserContext";
import NewFile from "./newFile/page";
import { Menu } from "lucide-react";
import Chat from "@/components/Chat"

export const metadata: Metadata = {
  title: "docVault",
  description: "A Document Management System",
};

export default function RootLayout({ }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <UserProvider>
        <Chat/>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
        <Chat/>
        <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <header className="flex items-center gap-2 bg-white p-4 w-full">
                <SidebarTrigger className="bg-white"><Menu className="text-darkblue" size={32}/></SidebarTrigger>
                <NavbarSearch />
              </header>
              
              <main className="flex-1 p-4">
                <NewFile />
                <section id="personal"><Personal /></section>
                <section id="school"><School /></section>
                <section id="work"><Work /></section>
              </main>
            </div>
          </SidebarProvider>
        </body>
      </html>
    </UserProvider>
  );
}