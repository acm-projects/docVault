import type { Metadata } from "next";

import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"

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
            <main>
            <SidebarTrigger />
            {children}
            </main>
        </SidebarProvider>
      </body>
    </html>
  );
}