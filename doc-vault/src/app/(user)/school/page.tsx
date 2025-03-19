"use client"

import { DueDateTable } from '@/components/DueDateTable'
import React, { useState } from 'react'

const School = () => {
  const [files, setFiles] = useState([
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
    setFiles((prevFiles) => [...prevFiles, newFile])
  }

  return (
    <section id="school">
      <div className="min-h-screen text-darkblue max-container padding-container mt-8">
        <div className="p-4">
          <h1 className="py-5 text-4xl font-bold text-lighterred">School</h1>
        </div>

        <div className="p-4 py-5">
          <DueDateTable files={files} addNewFile={addNewFile} />
        </div>

        <div className="p-4 py-5">
          <h1 className="py-5 text-2xl font-bold text-lighterred">Notes</h1>
        </div>

        <div className="p-4 py-5">
          <h1 className="py-5 text-2xl font-bold text-lighterred">Syllabus</h1>
        </div>
      </div>
    </section>
  )
}

export default School