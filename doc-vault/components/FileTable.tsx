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
import { CirclePlus } from "lucide-react";
import { Button } from "./ui/Button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
   
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

export function FileTable({ files, onFileSelect, addNewFile }: FileTableProps) {
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
  
  return (
    <Table className="text-darkblue border-2 rounded-lg border-gray-200">
        <TableHeader className="text-darkblue bg-gray-100">
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Tag</TableHead>
          <TableHead>Modified</TableHead>
          <TableHead>Created</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
            <TableRow className="bg-middlegray hover:bg-middlegray hover:font-bold transition-all">
                <TableCell colSpan={5} className="text-center py-4">
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
                              <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="file" className="text-right">
                                        Upload File
                                    </label>
                                    <input
                                      type="file"
                                      className="col-span-3 p-2"
                                      onChange={(e) => {
                                          const file = e.target.files?.[0];
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
                                  />
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