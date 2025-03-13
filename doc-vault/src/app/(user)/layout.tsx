import type { Metadata } from "next";

import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import NavbarSearch from "@/components/NavbarSearch";
import Personal from "./personal/page";
import School from "./school/page";
import Work from "./work/page";
import Chatbot from "./chatbot/page";

export const metadata: Metadata = {
  title: "docVault",
  description: "A Document Management System",
};

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
      <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-col flex-1">
            <header className="flex items-center gap-2 bg-white p-4 w-full">
              <SidebarTrigger />
              <NavbarSearch />
            </header>

            <main className="flex-1 p-4">
              <Chatbot />
              <Personal />
              <School />
              <Work />
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}