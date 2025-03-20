import { FileTable } from '@/components/FileTable'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Toggle } from '@/components/ui/toggle'
import { CornerDownRight, Filter, FolderClosed } from 'lucide-react'
import React from 'react'

const Work = () => {
  const folders = [
    {
      name: "Acme Corporation",
      body: "User-Friendly Global Functionalities",
    },
    {
      name: "Green Ltd",
      body: "Front-Line Composite Open architecture",
    },
    {
      name: "Hammes, Volkman and Bechtelar",
      body: "Face to face Human-Resource Focus group",
    },
    {
      name: "Emmerich LLC",
      body: "Enhanced Grid-Enabled Workforce",
    },
  ]

  const files = [
    {
        name: "ExampleFile",
        type: ".txt",
        tag: "Project 1",
        created: "01/01/2025",
        modified: "02/01/2025",
    },
    {
        name: "ExampleFile1",
        type: ".pdf",
        tag: "Project 1",
        created: "01/10/2025",
        modified: "09/01/2025",
    },
    {
        name: "ExampleFile2",
        type: ".jpeg",
        tag: "Project 2",
        created: "01/01/2024",
        modified: "02/01/2025",
    },
    {
        name: "ExampleFile3",
        type: ".docx",
        tag: "Project 3",
        created: "01/01/2023",
        modified: "02/01/2025",
    },
    {
        name: "ExampleFile4",
        type: ".pdf",
        tag: "Project 3",
        created: "01/01/2022",
        modified: "02/01/2022",
    },
    {
        name: "ExampleFile5",
        type: ".txt",
        tag: "Project 1",
        created: "01/01/2021",
        modified: "02/01/2021",
    },
    {
        name: "ExampleFile6",
        type: ".pptx",
        tag: "Project 2",
        created: "01/01/2021",
        modified: "02/01/2021",
    },
  ]
  
  return (
    <section id="work">
      <div className="text-darkblue max-container padding-container mb-10 mt-8">
        <h1 className="p-4 text-4xl font-bold text-lighterred">Work</h1>
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
                  <FileTable files={files} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default Work