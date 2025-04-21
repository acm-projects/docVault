"use client";

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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
   
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
  const [dragOver, setDragOver] = useState(false);
      const [dropped, setDropped] = useState(false);
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (!file) {
      alert("Please select a file first.");
      return;
    }
  
    const idToken = sessionStorage.getItem("idToken");
    if (!idToken) {
      alert("You're not logged in.");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onloadend = async () => {
      const base64data = reader.result?.toString().split(",")[1];
  
      const payload = {
        fileName: file.name,
        file: base64data,
        tag: newFile.tag,              // maps to document_subsubtype
        subtype: "personal"            // default subtype
      };
  
      try {
        const response = await fetch(
          "https://nnrmmjb013.execute-api.us-east-2.amazonaws.com/V3-Yes-Auth/UPLOAD-WITH-TAGS",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(payload),
          }
        );
  
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }
  
        const extension = file.name.split(".").pop()?.toLowerCase();
        const uploadedFile: File = {
          name: file.name,
          path: `https://docvault-karthik.s3.amazonaws.com/${file.name}`,
          type: `.${extension}`,
          tag: newFile.tag || "Manual",
          created: new Date().toLocaleDateString(),
          modified: new Date().toLocaleDateString(),
        };
  
        addNewFile(uploadedFile);
        alert("✅ File uploaded successfully!");
      } catch (err) {
        console.error("❌ Upload failed:", err);
        alert("❌ Upload failed. See console for details.");
      }
    };
  
    reader.readAsDataURL(file);
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
                    Upload a new file to S3. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="file-input" className="text-right">
                      Upload File
                    </label>
                    <input
                      id="file-input"
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
  );
}
