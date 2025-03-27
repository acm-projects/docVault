"use client"

import { DueDateTable } from '@/components/DueDateTable'
import { FileTable } from '@/components/FileTable'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Toggle } from '@/components/ui/toggle'
import { CornerDownRight, Filter, FolderClosed } from 'lucide-react'
import React, { useState } from 'react'

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

  const handleFileSelect = (file: { name: string; path?: string; type: string }) => {
    if (!file.path) {
      alert("No file path available!");
      return;
    }

    setSelectedFile(file);
    setIsModalOpen(true);
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
        </div>
      </div>
  )
}

export default School