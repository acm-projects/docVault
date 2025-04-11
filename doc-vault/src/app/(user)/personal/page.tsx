"use client";

import { FileTable } from "@/components/FileTable";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Toggle } from "@/components/ui/toggle";
import { ChevronDown, Filter, FolderClosed, X } from "lucide-react";
import React, { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";

const folders = [
  { name: "Finances", body: "Financial documents like statements or budgets.", color: "text-orange-600", subfolders: ["Bank Statements", "Bills", "Tax Documents", "Budget & Planning"] },
  { name: "Health", body: "This is a folder for medical documents.", color: "text-blue-500", subfolders: ["Medical Records", "Insurance", "Prescriptions", "Appointments"] },
  { name: "Identification", body: "This is a folder for identification.", color: "text-red", subfolders: ["Driver License", "Passport", "Birth Certificate", "Social Security"] },
  { name: "Travel", body: "This is a folder for travel documents.", color: "text-yellow-600", subfolders: ["Iterneraries", "Bookings", "Travel Insurance", "Visa Documents"] },
  { name: "Property", body: "This is a folder for property documents.", color: "text-green-600", subfolders: ["Lease Agreements", "Utility Bills", "Maintainance Records"] },
  { name: "Other Documents", body: "This is a folder for other miscellaneous documents.", color: "text-blue-900", subfolders: ["Receipts", "Warranties", "Personal Projects", "Letters"] },
];

const Personal = () => {
  const [selectedFile, setSelectedFile] = useState<{ name: string; path?: string; type: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileContent, setFileContent] = useState("");

  const [files, setFiles] = useState([
    {
        name: "ExampleFile",
        path: "./uploads/ExampleFile.txt",
        type: ".txt",
        tag: "Project 1",
        created: "01/01/2025",
        modified: "02/01/2025",
    },
    {
        name: "ExampleFile1",
        path: "./uploads/ExampleFile1.pdf",
        type: ".pdf",
        tag: "Project 1",
        created: "01/10/2025",
        modified: "09/01/2025",
    },
    {
        name: "ExampleFile2",
        path: "./uploads/ExampleFile2.jpeg",
        type: ".jpeg",
        tag: "Project 2",
        created: "01/01/2024",
        modified: "02/01/2025",
    },
    {
        name: "ExampleFile3",
        path: "./uploads/ExampleFile3.docx",
        type: ".docx",
        tag: "Project 3",
        created: "01/01/2023",
        modified: "02/01/2025",
    },
    {
        name: "ExampleFile4",
        path: "./uploads/ExampleFile4.pdf",
        type: ".pdf",
        tag: "Project 3",
        created: "01/01/2022",
        modified: "02/01/2022",
    },
    {
        name: "ExampleFile5",
        path: "./uploads/ExampleFile5.txt",
        type: ".txt",
        tag: "Project 1",
        created: "01/01/2021",
        modified: "02/01/2021",
    },
    {
        name: "ExampleFile6",
        path: "./uploads/ExampleFile6.jpeg",
        type: ".jpeg",
        tag: "Project 2",
        created: "01/01/2021",
        modified: "02/01/2021",
    },
  ]);
  
  const addNewFile = (newFile: any) => {
    setFiles((prevFiles) => [...prevFiles, newFile])
  }

  const handleFileSelect = async (file: { name: string; path?: string; type: string }) => {
    if (!file.path) {
      alert("No file path available!");
      return;
    }

    setSelectedFile(file);
    setIsModalOpen(true);
    setFileContent("");

    if (file.type === ".txt") {
      try {
        const response = await fetch(file.path);
        const text = await response.text();
        setFileContent(text);
      } 
      
      catch (error) {
        setFileContent("Failed to load file.");
      }
    }
  };

  return (
    <section id="personal">
      <div className="text-darkblue max-container padding-container mb-10 mt-8">
        <h1 className="p-10 text-4xl font-bold text-lighterred">Personal</h1>
        <div className="px-10 pb-10">
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
                      <AccordionItem key={sub} className="my-5 p-5 border-darkblue border bg-gray-400 rounded-md" value={sub} >
                        <AccordionTrigger>
                        <div className="flex items-center justify-between w-full">
                          <h2 className="text-xl">{sub}</h2>
                          <ChevronDown />
                        </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex py-5 pl-2">
                          <FileTable
                            files={files}
                            onFileSelect={handleFileSelect}
                            addNewFile={addNewFile}
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
              <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900">
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
                      <iframe src={`https://docs.google.com/gview?url=${window.location.origin}${selectedFile.path}&embedded=true`} className="w-full h-full" />
                    ) : selectedFile.type === ".txt" ? (
                      <pre className="p-4 rounded-md">{fileContent}</pre>
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
};

export default Personal;
