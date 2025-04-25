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
  const [pfolders, setPfolders] = useState([
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

        const [sfolders, setSfolders] = useState([
          {
            name: "CS 3377",
            body: "Systems Programming in Unix and Other Environments",
            color: "text-green-600",
            subfolders: ["Notes", "Homework", "Exams & Quizzes", "Projects", "Class Info"],
          },
          {
            name: "ECS 2390",
            body: "Professional and Technical Communications",
            color: "text-red",
            subfolders: ["Notes", "Homework", "Exams & Quizzes", "Projects", "Class Info"],
          },
          {
            name: "CS 3345",
            body: "Data Structures and Algorithms",
            color: "text-blue-600",
            subfolders: ["Notes", "Homework", "Exams & Quizzes", "Projects", "Class Info"],
          },
          {
            name: "PHYS 2426",
            body: "University Physics II + Lab",
            color: "text-yellow-600",
            subfolders: ["Notes", "Homework", "Exams & Quizzes", "Projects", "Class Info"],
          },
          {
            name: "Academic Records",
            body: "Contains important records like transcripts and enrollment documents.",
            color: "text-blue-900",
            subfolders: [
              "Transcripts",
              "Resumes",
              "Letters of Recommendation",
              "Certificates",
              "Test Scores (SAT, GRE, etc.)",
              "Enrollment Documents",
            ],
          },
        ]);

        const [groupedPfiles, setGroupedPfiles] = useState<Record<string, FileItem[]>>({});
        const [groupedSfiles, setGroupedSfiles] = useState<Record<string, FileItem[]>>({});
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
                folders={pfolders}
                groupedFiles={groupedPfiles}
                addFolders={(newFolders: {
                  name: string;
                  body: string;
                  color: string;
                  subfolders: string[];
                }[]) => setPfolders([...newFolders])}
                setGroup={(group: Record<string, FileItem[]>) => setGroupedPfiles(group)}
                 />
                <section id="personal"><Personal
                folders={pfolders}
                groupedFiles={groupedPfiles}
                addFolders={(newFolders: {
                  name: string;
                  body: string;
                  color: string;
                  subfolders: string[];
                }[]) => setPfolders([...newFolders])}
                setGroup={(group: any) => setGroupedPfiles(group)}
                />
                </section>
                <section id="school"><School
                folders={sfolders}
                groupedFiles={groupedSfiles}
                addFolders={(newFolders: {
                  name: string;
                  body: string;
                  color: string;
                  subfolders: string[];
                }[]) => setSfolders([...newFolders])}
                setGroup={(group: any) => setGroupedSfiles(group)}
                 />
                 </section>
                <section id="work"><Work /></section>
              </main>
            </div>
          </SidebarProvider>
        </body>
      </html>
    </UserProvider>
  );
}