"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { CirclePlus, MoreHorizontal, ScrollText, Trash2 } from "lucide-react";
import { Button } from "./ui/Button";
import { DragEvent, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DropdownMenuGroup, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
   
interface File {
    name: string;
    path: string;
    type: string;
    tag: string;
    modified: string;
    created: string;
}

interface FileTableProps {
    files: File[];
    onFileSelect: (file: File) => void;
    addNewFile: (newFile: File) => void;
}

const languages = [
  "English", "Spanish", "Spanish (Mexico)", "French", "French (Canada)", "Hindi", "German",
  "Chinese (Simplified)", "Chinese (Traditional)", "Arabic", "Portuguese", "Portuguese (Portugal)", "Russian",
  "Japanese", "Korean", "Afrikaans", "Albanian", "Amharic", "Armenian", "Azerbaijani", "Bengali", "Bosnian",
  "Bulgarian", "Catalan", "Croatian", "Czech", "Danish", "Dari", "Dutch", "Estonian", "Finnish", "Georgian",
  "Greek", "Gujarati", "Haitian Creole", "Hausa", "Hebrew", "Hungarian", "Icelandic", "Indonesian", "Irish",
  "Italian", "Kannada", "Kazakh", "Latvian", "Lithuanian", "Macedonian", "Malay", "Malayalam", "Maltese",
  "Mongolian", "Marathi", "Norwegian", "Farsi (Persian)", "Pashto", "Polish", "Punjabi", "Romanian", "Serbian",
  "Sinhala", "Slovak", "Slovenian", "Somali", "Swahili", "Swedish", "Filipino Tagalog", "Tamil", "Telugu",
  "Thai", "Turkish", "Ukrainian", "Urdu", "Uzbek", "Vietnamese", "Welsh",
];

export function FileTable({ files, onFileSelect, addNewFile }: FileTableProps) {
  const [dragOver, setDragOver] = useState(false);
      const [dropped, setDropped] = useState(false);
      const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  
      const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragOver(true);
      }
  
      const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragOver(false);
          setDropped(false);
      }
  
      const handleDrop = (e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragOver(false);
          setDropped(true);
  
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              const file = e.dataTransfer.files[0];
              console.log("Dropped file: ", file);
          }
      }
  
  const [newFile, setNewFile] = useState<File>({
    name: "",
    path: "",
    tag: "",
    type: "",
    modified: new Date().toLocaleDateString(),
    created: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
      
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      
    if (!newFile.name) {
      alert("Please enter a name.");
      return;
    }
    
    const fileExtension = newFile.name.includes(".")
        ? newFile.name.split(".").pop()
        : "unknown";
          
    const formattedCreateDate = new Date(newFile.created)
      .toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  
    const fileToAdd = {
      ...newFile,
      type: fileExtension || "unknown",
      created: formattedCreateDate,
    };
      
    addNewFile(fileToAdd);
    console.log("New File Added:", fileToAdd);
      
    setNewFile({
      name: "",
      path: "",
      tag: "",
      type: "",
      modified: new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      created: "",
    });
          
    setSelectedFile(null);
  };

  const handleLanguageSelect = async (language: string) => {
    setSelectedLanguage(language);
  
    const formData = new FormData();
    formData.append("language", language);
  
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Translation failed");
  
      const data = await response.json();
      console.log("Translation successful:", data);
      alert(`File translated to ${language} successfully!`);
    } 
    
    catch (error) {
      console.error("Translation error:", error);
      alert("Translation failed.");
    }
  };
  
  return (
    <Table className="text-darkblue border-2 rounded-lg border-gray-200">
      <TableHeader className="text-darkblue bg-gray-100">
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Tag</TableHead>
          <TableHead>Modified</TableHead>
          <TableHead>Created</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="rounded-md">
       {files.map((file) => (
          <TableRow 
            key={file.name}
            className="px-5 cursor-pointer hover:bg-gray-200 transition"
            onClick={() => onFileSelect(file)}
          >
              <TableCell className="font-medium pr-8">{file.name}</TableCell>
              <TableCell>{file.type}</TableCell>
              <TableCell>
              <p className="p-1 w-20 text-center border-red border-2 rounded-md px-2">
                {file.tag}
              </p>
              </TableCell>
              <TableCell>{file.modified}</TableCell>
              <TableCell>{file.created}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="flex flex-row gap-x-3"><ScrollText />Translate</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuGroup className="p-2">Scroll for more languages</DropdownMenuGroup>
                            {languages.map((lang) => (
                              <DropdownMenuItem key={lang} onClick={() => handleLanguageSelect(lang)}>
                                {lang}
                              </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem className="flex flex-row gap-x-3"><Trash2 />Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
          <TableRow className="bg-middlegray hover:bg-middlegray hover:font-bold transition-all">
            <TableCell colSpan={6} className="text-center py-4">
              <Dialog>
                <DialogTrigger>
                  <div className="px-2 flex items-center">
                    <CirclePlus className="left-10 text-lighterred" />
                    <p className="px-5">Add New Item</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-middlegray">
                  <DialogHeader>
                    <DialogTitle>Add a new item</DialogTitle>
                    <DialogDescription>
                      Create a new file entry here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="p-4 flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-1/2 h-64 shadow-lg p-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ${dragOver ? "bg-middlegray" : "bg-white"}`}>
                        <div 
                          className="flex flex-col items-center justify-center pt-5 pb-6"
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onChange={(e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              const fileExtension = file.name.includes(".") ? file.name.split(".").pop() : "unknown";
                              setNewFile({
                                name: file.name,
                                path: URL.createObjectURL(file),
                                tag: "",
                                type: fileExtension || "unknown",
                                created: new Date(file.lastModified).toLocaleDateString(),
                                modified: new Date(file.lastModified).toLocaleDateString(),
                              });
                            }
                          }}
                        >
                          <svg className="w-8 h-8 mb-4 text-darkblue" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-darkblue">{dropped ? "File uploaded!" : "Click to upload or drag and drop"}</p>
                        </div>
                        <input 
                          id="dropzone-file" 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                          }}
                        />
                      </label>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="tag" className="text-right">
                        Tag
                      </label>
                      <input
                        id="tag"
                        value={newFile.tag}
                        onChange={(e) =>
                          setNewFile({ ...newFile, tag: e.target.value })
                        }
                        className="col-span-3 border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save File</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
      </TableFooter>
    </Table>
  )
}