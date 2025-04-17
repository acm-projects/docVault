"use client";

import { FileTable } from "@/components/FileTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Toggle } from "@/components/ui/toggle";
import { ChevronDown, Filter, FolderClosed, X } from "lucide-react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

type FileItem = {
  name: string;
  path: string;
  type: string;
  tag: string;
  created: string;
  modified: string;
};

const folders = [
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
];

export default function Personal() {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupedFiles, setGroupedFiles] = useState<Record<string, FileItem[]>>({});

  const handleFileSelect = async (file: FileItem) => {
    const idToken = sessionStorage.getItem("idToken");
    if (!idToken) return alert("Missing token");

    try {
      const res = await fetch(
        `https://nnrmmjb013.execute-api.us-east-2.amazonaws.com/V3-Yes-Auth/GET?fileName=${encodeURIComponent(file.name)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      const result = await res.json();
      const presignedUrl = result.downloadUrl;
      setSelectedFile({ ...file, path: presignedUrl });
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error fetching file:", err);
      alert("Could not preview file.");
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
  
      const idToken = sessionStorage.getItem("idToken");
      if (!idToken) {
        return;
      }
  
      try {
        const res = await fetch(
          "https://nnrmmjb013.execute-api.us-east-2.amazonaws.com/V3-Yes-Auth/GET-ALL-FILES",
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
  
        
  
        if (!res.ok) {
          const errText = await res.text();
          return;
        }
  
        const result = await res.json();

  
        const groupedRaw: Record<string, any[]> = result;
  
        if (!groupedRaw || typeof groupedRaw !== "object") {
          
          return;
        }
  
        const groupedCleaned: { [key: string]: FileItem[] } = {};
  
        for (const [subsubtype, files] of Object.entries(groupedRaw)) {
          
          groupedCleaned[subsubtype.toLowerCase()] = files.map((file: any) => {
            const extension = file.document_name.split(".").pop()?.toLowerCase();
            return {
              name: file.document_name,
              path: file.s3_path.replace(
                "s3://docvault-karthik/",
                "https://docvault-karthik.s3.amazonaws.com/"
              ),
              type: `.${extension}`,
              tag: file.document_type || "Unknown",
              created: new Date(file.upload_date).toLocaleDateString(),
              modified: new Date(file.upload_date).toLocaleDateString(),
            };
          });
        }
  
        
        setGroupedFiles(groupedCleaned);
      } catch (err) {
        
      }
    };
  
    fetchFiles();
  }, []);
  
  
  

  return (
    <section id="personal">
      <div className="text-darkblue max-container padding-container mb-10 mt-8">
        <h1 className="p-4 text-4xl font-bold text-lighterred">Personal</h1>
        <div className="p-4">
          <div className="flex justify-end text-darkblue gap-2">
            <Toggle variant="outline">Created</Toggle>
            <Toggle variant="outline">Modified</Toggle>
            <Toggle variant="outline">Tag</Toggle>
            <Toggle variant="outline">Type</Toggle>
            <Filter className="mx-3" size={32} />
          </div>

          <Accordion type="single" collapsible>
            {folders.map((folder) => (
              <AccordionItem key={folder.name} className="my-5 p-5 border-darkblue border bg-gray-400 rounded-md" value={folder.name}>
                <AccordionTrigger>
                  <div className="flex gap-5 w-full">
                    <FolderClosed className={folder.color} strokeWidth={1} size={90} />
                    <div>
                      <h2 className="text-xl">{folder.name}</h2>
                      <p className="py-2 font-light">{folder.body}</p>
                    </div>
                  </div>
                  <ChevronDown />
                </AccordionTrigger>
                <AccordionContent className="flex py-5 pl-2">
                  <Accordion className="w-full" type="single" collapsible>
                    {folder.subfolders.map((sub) => (
                      <AccordionItem key={sub} className="my-5 p-5 border-darkblue border bg-gray-400 rounded-md" value={sub}>
                        <AccordionTrigger>
                          <div className="flex items-center justify-between w-full">
                            <h2 className="text-xl">{sub}</h2>
                            <ChevronDown />
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex py-5 pl-2">
                          <FileTable
                            files={groupedFiles[sub.toLowerCase()] || []}
                            onFileSelect={handleFileSelect}
                            addNewFile={() => {}}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Modal
            ariaHideApp={false}
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="w-full max-w-4xl"
            >
              <div className="relative bg-white p-6 rounded-lg shadow-lg w-full">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                >
                  <X size={24} />
                </button>

                {selectedFile && (
                  <>
                    <h2 className="text-lg font-semibold mb-4">{selectedFile.name}</h2>
                    <div className="w-full h-[800px]">
                      {selectedFile.type === ".pdf" ? (
                        <iframe src={selectedFile.path} className="w-full h-full" />
                      ) : selectedFile.type === ".jpeg" || selectedFile.type === ".png" ? (
                        <img src={selectedFile.path} className="w-full h-full" alt={selectedFile.name} />
                      ) : selectedFile.type === ".docx" ? (
                        <iframe src={`https://docs.google.com/gview?url=${selectedFile.path}&embedded=true`} />
                      ) : selectedFile.type === ".txt" ? (
                        <iframe src={selectedFile.path} className="w-full h-full" />
                      ) : (
                        <p className="text-center">File preview not available</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </Modal>
        </div>
      </div>
    </section>
  );
}
