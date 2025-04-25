"use client";

import { DueDateTable } from "@/components/DueDateTable";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";

type FileItem = {
  name: string;
  path: string;
  type: string;
  tag: string;
  created: string;
  modified: string;
  due_date?: string | null;
};

interface SchoolProps {
  folders: {
    name: string;
    body: string;
    color: string;
    subfolders: string[];
  }[],
  groupedFiles: Record<string, FileItem[]>,
  addFolders:(folder: {
    name: string;
    body: string;
    color: string;
    subfolders: string[];
  }[]) => void,
  setGroup:(group: Record<string, FileItem[]>) => void
}

const School = ({folders, groupedFiles, addFolders, setGroup}: SchoolProps) => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hwFiles, setHwFiles] = useState<any[]>([]);
  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      const idToken = sessionStorage.getItem("idToken");
      if (!idToken) return;

      try {
        const res = await fetch(
          "https://nnrmmjb013.execute-api.us-east-2.amazonaws.com/V3-Yes-Auth/GET-ALL-FILES",
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        const result = await res.json();
        const groupedRaw: Record<string, any[]> = result;
        const groupedCleaned: Record<string, FileItem[]> = {};

        for (const [subsubtype, files] of Object.entries(groupedRaw)) {
          for (let i = 0; i < files.length; i++) {
            if (files[i].document_type.toLowerCase() == 'student') {
            const subtype = files[i].document_subtype.toLowerCase();
            if (!folders.some(e => e.name.toLowerCase() == subtype)) {
              const newFolders = [...folders]
              newFolders.push({
                name: `${subtype}`,
                body: `This is a folder for ${subtype} documents.`,
                color: "text-blue-900",
                subfolders: [`${subsubtype}`]
              })
              addFolders(newFolders)
            } else if (!folders.find(e => e.name.toLowerCase() == subtype)?.subfolders.some(e => e.toLowerCase() == subsubtype)) {
              const newFolders = [...folders]
              newFolders.find(e => e.name.toLowerCase() == subtype)?.subfolders.push(subsubtype);
              addFolders(newFolders)
            }
            }
          }
          groupedCleaned[subsubtype.toLowerCase()] = files.map((file: any) => {
            const extension = file.document_name.split(".").pop()?.toLowerCase();
            return {
              name: file.document_name,
              path: file.s3_path.replace("s3://docvault-karthik/", "https://docvault-karthik.s3.amazonaws.com/"),
              type: `.${extension}`,
              tag: file.document_subsubtype || "Unknown",
              created: new Date(file.upload_date).toLocaleDateString(),
              modified: new Date(file.upload_date).toLocaleDateString(),
              due_date: file.due_date || null,
            };
          });
        }

        

        setGroup(groupedCleaned);

        // To-Do List Filtering
        const todoTags = ["homework", "quiz", "reading", "exam"];
        const extractedHw = Object.entries(groupedCleaned)
          .filter(([key]) => todoTags.includes(key.toLowerCase()))
          .flatMap(([, files]) =>
            files
              .filter((file) => file.due_date !== null)
              .map((file) => ({
                name: file.name,
                tag: file.tag,
                modified: file.modified,
                due_date: file.due_date
                ? new Date(file.due_date + "T00:00:00").toLocaleDateString()
                : null,
              }))
          );

        setHwFiles(extractedHw);
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    };

    fetchFiles();
  }, []);

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

  return (
    <div className="min-h-full text-darkblue max-container padding-container mt-8">
      <div className="p-10">
        <h1 className="py-5 text-4xl font-bold text-lighterred">School</h1>
      </div>

      <Tabs defaultValue="classes" className="px-10 w-full">
        <TabsList className="grid w-full grid-cols-2 shadow-lg">
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="to-do">To Do</TabsTrigger>
        </TabsList>
        <TabsContent value="to-do">
          <DueDateTable files={hwFiles} addNewHwFile={() => {}} />
        </TabsContent>
        <TabsContent value="classes">
          <div className="mt-5 pb-5">
            <div className="flex justify-end text-darkblue gap-2 mt-10">
              <Toggle variant="outline">Created</Toggle>
              <Toggle variant="outline">Modified</Toggle>
              <Toggle variant="outline">Tag</Toggle>
              <Toggle variant="outline">Type</Toggle>
              <Filter className="mx-3" size={32} />
            </div>

            <Accordion type="single" collapsible>
              {folders.map((folder) => (
                <AccordionItem
                  key={folder.name}
                  className="my-5 p-5 border-darkblue border bg-gray-400 rounded-md"
                  value={folder.name}
                >
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
                        <AccordionItem
                          key={sub}
                          className="my-5 p-5 border-darkblue border bg-gray-400 rounded-md"
                          value={sub}
                        >
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default School;
