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
import { Checkbox } from "./ui/checkbox";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
   
interface File {
    name: string;
    tag?: string;
    due: string;
    modified: string;
}

interface TableProps {
    files: File[];
    addNewHwFile: (newFile: File) => void;
}

export function DueDateTable({ files, addNewHwFile }: TableProps) {
    const [newFile, setNewFile] = useState<File>({
        name: "",
        tag: "",
        due: "",
        modified: new Date().toLocaleDateString(),
      });
      
      const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!newFile.name || !newFile.due) {
            alert("Please enter a name and select a due date.");
            return;
        }      
        
        const formattedDueDate = new Date(newFile.due)
            .toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        });

        const fileToAdd = {
            ...newFile,
            due: formattedDueDate,
        };
    
        addNewHwFile(fileToAdd);
        console.log("New File Added:", fileToAdd);
    
        setNewFile({
          name: "",
          tag: "",
          due: "",
          modified: new Date().toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }),
        });
        
        setSelectedFile(null);
      };

    return (
      <Table className="text-darkblue border-2 rounded-lg border-gray-200">
        <TableHeader className="text-darkblue bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px]">Done</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Modified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="rounded-md">
            {files.map((file) => (
            <TableRow className="px-5" key={file.name}>
                <TableCell className="px-5"><Checkbox /></TableCell>
                <TableCell className="font-medium pr-5">{file.name}</TableCell>
                <TableCell>
                    {file.tag ? (
                        <p className="p-1 inline-block text-center border-red border-2 rounded-md px-2">
                            {file.tag}
                        </p>
                    ) : (
                        <p className="text-white hover:text-muted/50">No tag</p>
                    )}
                
                </TableCell>
                <TableCell>{file.due}</TableCell>
                <TableCell>{file.modified}</TableCell>
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
                                    Create a new event here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="name" className="text-right">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        value={newFile.name}
                                        onChange={(e) =>
                                            setNewFile({ ...newFile, name: e.target.value })
                                        }
                                        className="col-span-3 border border-gray-300 rounded-md p-2"
                                        required
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
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="due" className="text-right">
                                        Due Date
                                    </label>
                                    <input
                                        id="due"
                                        type="date"
                                        value={newFile.due}
                                        onChange={(e) =>
                                            setNewFile({ ...newFile, due: e.target.value })
                                        }
                                        className="col-span-3 border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="file" className="text-right">
                                        Upload File
                                    </label>
                                    <input
                                        type="file"
                                        className="col-span-3 p-2"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            setSelectedFile(
                                            file
                                                ? {
                                                    name: file.name,
                                                    tag: "New",
                                                    due: "",
                                                    modified: new Date().toLocaleDateString(),
                                                }
                                                : null
                                            );
                                        }}
                                    />
                                </div>
                            <DialogFooter>
                                <Button type="submit">Save Event</Button>
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