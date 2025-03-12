import { FileTable } from '@/components/FileTable'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/Button'
import { Toggle } from '@/components/ui/toggle'
import { CornerDownRight, Filter } from 'lucide-react'
import React from 'react'

const Personal = () => {
  const folders = [
    {
      name: "Personal Documents",
      body: "This is a folder for personal documents.",
      img: "https://placehold.co/400",
    },
    {
      name: "Legal Documents",
      body: "This is a folder for legal documents.",
      img: "https://placehold.co/400",
    },
    {
      name: "Property Information",
      body: "This is a folder for property documents.",
      img: "https://placehold.co/400",
    },
    {
      name: "Other Documents",
      body: "This is a folder for other documents.",
      img: "https://placehold.co/400",
    },
  ]

  const files = [
    {
        name: "ExampleFile.txt",
        type: ".txt",
        tag: "Project 1",
        created: "01/01/2025",
        modified: "02/01/2025",
    },
    {
        name: "ExampleFile1.txt",
        type: ".pdf",
        tag: "Project 1",
        created: "01/10/2025",
        modified: "09/01/2025",
    },
    {
        name: "ExampleFile2.txt",
        type: ".jpeg",
        tag: "Project 2",
        created: "01/01/2024",
        modified: "02/01/2025",
    },
    {
        name: "ExampleFile3.txt",
        type: ".docx",
        tag: "Project 3",
        created: "01/01/2023",
        modified: "02/01/2025",
    },
    {
        name: "ExampleFile4.txt",
        type: ".pdf",
        tag: "Project 3",
        created: "01/01/2022",
        modified: "02/01/2022",
    },
    {
        name: "ExampleFile5.txt",
        type: ".txt",
        tag: "Project 1",
        created: "01/01/2021",
        modified: "02/01/2021",
    },
    {
        name: "ExampleFile6.txt",
        type: ".pptx",
        tag: "Project 2",
        created: "01/01/2021",
        modified: "02/01/2021",
    },
  ]
  
  return (
    <div className="text-darkblue max-container padding-container mt-8">
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
                <img src={folder.img} alt={folder.name} className="w-40 h-40 rounded-md" />
                  <div>
                    <h2 className="text-xl">{folder.name}</h2>
                    <p className="py-2 font-light">{folder.body}</p>
                    <AccordionTrigger></AccordionTrigger>
                  </div>
              </div>
              <AccordionContent className='flex py-5 pl-2'>
                <CornerDownRight className="text-darkblue mr-3 w-10 h-10" />
                <FileTable files={files} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export default Personal