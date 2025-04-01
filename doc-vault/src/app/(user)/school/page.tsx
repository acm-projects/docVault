"use client"

import { DueDateTable } from '@/components/DueDateTable'
import { FileTable } from '@/components/FileTable'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Toggle } from '@/components/ui/toggle'
import { CornerDownRight, Filter, FolderClosed, X } from 'lucide-react'
import React, { useState } from 'react'
import Modal from "react-modal";
import { motion } from "framer-motion";

const folders = [
  {
    name: "CS 3377",
    body: "Systems Programming in Unix and Other Environments",
  },
  {
    name: "ECS 2390",
    body: "Professional and Technical Communications",
  },
  {
    name: "CS 3345",
    body: "Data Structures and Algorithms",
  },
  {
    name: "PHYS 2426",
    body: "University Physics II + Lab",
  },
]

const files = [
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
]


const School = () => {
  const [selectedFile, setSelectedFile] = useState<{ name: string; path?: string; type: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileContent, setFileContent] = useState("");

  const [hwFiles, setHwFiles] = useState([
    {
        name: "Homework 1 - Basic Time Complexity",
        tag: "Priority",
        modified: "01/10/2025",
        due: "01/12/2025",
    },
    {
        name: "Homework 2 - Advanced Time Complexity",
        modified: "01/20/2025",
        due: "01/30/2025",
    },
    {
        name: "Quiz 1 - Basic Time Complexity",
        tag: "Coming Up",
        modified: "02/10/2025",
        due: "02/12/2025",
    },
    {
        name: "Homework 3 - Data Structures",
        modified: "02/10/2025",
        due: "03/12/2025",
    },
    {
        name: "Reading - Data Structures",
        modified: "02/10/2025",
        due: "04/12/2025",
    },
    {
        name: "Exam (Chapters 1-5)",
        modified: "02/10/2025",
        due: "04/12/2025",
    },
  ])

  const addNewFile = (newFile: any) => {
    setHwFiles((prevFiles) => [...prevFiles, newFile])
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
      } catch (error) {
        setFileContent("Failed to load file.");
      }
    }
  };

  return (
    <div className="min-h-screen text-darkblue max-container padding-container mt-8">
        <div className="p-4">
          <h1 className="py-5 text-4xl font-bold text-lighterred">School</h1>
        </div>

        <div className="p-4 py-5">
          <DueDateTable files={hwFiles} addNewFile={addNewFile} />
        </div>

        <div className="p-4 py-5">
          <h1 className="py-5 text-3xl font-medium text-lighterred">Notes</h1>
          <div className="flex justify-end text-darkblue gap-2">
            <Toggle variant="outline" aria-label="Toggle created date">Created</Toggle>
            <Toggle variant="outline" aria-label="Toggle modified date">Modified</Toggle>
            <Toggle variant="outline" aria-label="Toggle tag">Tag</Toggle>
            <Toggle variant="outline" aria-label="Toggle type">Type</Toggle>
            <Filter className="mx-3" size={32} />
          </div>
              
          <Accordion type="single" collapsible>
            {folders.map((folder) => (
              <AccordionItem key={folder.name} className="my-5 p-5 border-darkblue border bg-gray-400 rounded-md" value={folder.name}>
                <div className='flex gap-5'>
                  <FolderClosed className="text-slate-700" strokeWidth={1} size={90}/>
                    <div>
                      <h2 className="text-xl">{folder.name}</h2>
                      <p className="py-2 font-light">{folder.body}</p>
                      <AccordionTrigger></AccordionTrigger>
                    </div>
                </div>
                <AccordionContent className='flex py-5 pl-2'>
                  <CornerDownRight className="text-darkblue mr-3 w-10 h-10" />
                  <FileTable files={files} onFileSelect={handleFileSelect}/>
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
  )
}

export default School