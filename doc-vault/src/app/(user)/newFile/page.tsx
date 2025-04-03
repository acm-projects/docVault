"use client";

import { FileTable } from "@/components/FileTable";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Toggle } from "@/components/ui/toggle";
import { CornerDownRight, Filter, FolderClosed, X } from "lucide-react";
import React, { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";

const NewFile = () => {
  return (
    <section id="newFile">
      <div className="text-darkblue max-container padding-container mb-10 mt-8">
        <h1 className="p-4 text-4xl font-bold text-lighterred">Add a File</h1>
        <div className="p-4">
          <p>Here we will add a file</p>
        </div>
      </div>
    </section>
  );
};

export default NewFile;