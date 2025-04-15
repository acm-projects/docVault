"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion2'
import { useUser } from '@/context/UserContext'
import { ChevronLeft, CircleUserRound, CornerDownRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const icon =  <CircleUserRound strokeWidth={1.5} size={180}/>;

const Settings = () => {
  const { firstName, lastName } = useUser();
  
  const folders = [
    {
      name: "Security and Access",
      options: "",
    },
    {
      name: "User Roles and Permissions",
      options: "",
    },
    {
      name: "Translate Options",
      options: "",
    },
    {
      name: "Version Control",
      options: "",
    },
    {
      name: "Other",
      options: "",
    },
  ]

  return (
    <div className="text-darkblue max-container padding-container mt-8">
      <Link className="flex" href="/personal">
        <ChevronLeft />
        <span className="px-5">Back</span>
      </Link>
      <div className="p-4 py-10">
        <h1 className="text-4xl font-bold text-lighterred">Settings</h1>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/3 flex flex-col items-center">
          <span>{icon}</span>
          <h2 className="text-2xl">{firstName} {lastName}</h2>
        </div>
        <div className="w-2/3 flex flex-col">
          <Accordion type="single" collapsible>
            {folders.map((folder) => (
              <AccordionItem key={folder.name} className="my-2 p-2 w-full border-darkblue border bg-gray-400 rounded-md" value={folder.name}>
                <AccordionTrigger>
                  <h2 className="text-xl">{folder.name}</h2>
                </AccordionTrigger>
                <AccordionContent className='w-full flex py-5 pl-2'>
                  <CornerDownRight className="text-darkblue mr-3 w-10 h-10" />
                  
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default Settings