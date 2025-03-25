"use client"

import { FileTable } from '@/components/FileTable'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Toggle } from '@/components/ui/toggle'
import { CornerDownRight, Filter, FolderClosed } from 'lucide-react'
import React, { useState } from 'react'

const Personal = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  
  const folders = [
    {
      name: "Personal Documents",
      body: "This is a folder for personal documents.",
    },
    {
      name: "Legal Documents",
      body: "This is a folder for legal documents.",
    },
    {
      name: "Property Information",
      body: "This is a folder for property documents.",
    },
    {
      name: "Other Documents",
      body: "This is a folder for other documents.",
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

  const handleFileSelect = (file: { name: string; path?: string; type: string }) => {
    if (!file.path) {
      return;
    }
  
    const fileUrl = `${window.location.origin}${file.path.replace("./", "/")}`;
  
    console.log("Opening file:", fileUrl);
  
    if (file.type === ".pdf" || file.type === ".jpeg") {
      window.open(fileUrl, "_blank");
    } 
    
    else if (file.type === ".docx") {
      window.open(`https://docs.google.com/gview?url=${fileUrl}&embedded=true`, "_blank");
    } 
    
    else {
      window.open(fileUrl, "_blank");
    }
  };
  
  return (
      <div className="text-darkblue max-container padding-container mb-10 mt-8">
        <h1 className="p-4 text-4xl font-bold text-lighterred">Personal</h1>
        <div className="p-4">
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
                  <FileTable files={files} onFileSelect={handleFileSelect} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {selectedFile && (
            <div className="mt-6 p-4 bg-white border rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Opened File: {selectedFile}</h2>
              <p className="text-gray-600">File preview or editing options will be displayed here.</p>
            </div>
          )}
        </div>
      </div>
  )
}

export default Personal