'use client'
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
import {useState} from "react"

/*export const metadata: Metadata = {
  title: "docVault",
  description: "A Document Management System",
};*/

type FileItem = {
  name: string;
  path: string;
  type: string;
  tag: string;
  created: string;
  modified: string;
};

export default function RootLayout({ }: Readonly<{ children: React.ReactNode;}>) {
  const [folders, setFolders] = useState([
          {
            name: "Finances",
            body: "Financial documents like statements or budgets.",
            color: "text-orange-600",
            subfolders: ["Bank Statements", "Bills", "Tax Documents", "Budget & Planning"],
          },
          {
            name: "Health",
            body: "This is a folder for medical documents.",
            color: "text-blue-500",
            subfolders: ["Medical Records", "Insurance", "Prescriptions", "Appointments"],
          },
          {
            name: "Identification",
            body: "This is a folder for identification.",
            color: "text-red",
            subfolders: ["Driver License", "Passport", "Birth Certificate", "Social Security"],
          },
          {
            name: "Travel",
            body: "This is a folder for travel documents.",
            color: "text-yellow-600",
            subfolders: ["Itineraries", "Bookings", "Travel Insurance", "Visa Documents"],
          },
          {
            name: "Property",
            body: "This is a folder for property documents.",
            color: "text-green-600",
            subfolders: ["Lease Agreements", "Utility Bills", "Maintainance Records"],
          },
          {
            name: "Other Documents",
            body: "This is a folder for other miscellaneous documents.",
            color: "text-blue-900",
            subfolders: ["Receipts", "Warranties", "Personal Projects", "Letters"],
          },
        ]);

        const [groupedFiles, setGroupedFiles] = useState<Record<string, FileItem[]>>({});
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
                <NewFile
                folders={folders}
                groupedFiles={groupedFiles}
                addFolders={(newFolders: {
                  name: string;
                  body: string;
                  color: string;
                  subfolders: string[];
                }[]) => setFolders([...newFolders])}
                setGroup={(group: Record<string, FileItem[]>) => setGroupedFiles(group)}
                 />
                <section id="personal"><Personal
                folders={folders}
                groupedFiles={groupedFiles}
                addFolders={(newFolders: {
                  name: string;
                  body: string;
                  color: string;
                  subfolders: string[];
                }[]) => setFolders([...newFolders])}
                setGroup={(group: Record<string, FileItem[]>) => setGroupedFiles(group)}
                />
                </section>
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