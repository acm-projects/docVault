"use client";

import {
  Table, TableBody, TableCell, TableFooter,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { CirclePlus, MoreHorizontal, ScrollText, Trash2 } from "lucide-react";
import { Button } from "./ui/Button";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "./ui/dialog";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { DragEvent, useState } from "react";

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
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [newFile, setNewFile] = useState<File>({
    name: "",
    path: "",
    tag: "",
    type: "",
    modified: new Date().toLocaleDateString(),
    created: new Date().toLocaleDateString(),
  });

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    setDropped(true);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const ext = file.name.split(".").pop();
      setNewFile({
        name: file.name,
        path: URL.createObjectURL(file),
        tag: "",
        type: ext ? `.${ext}` : "unknown",
        created: new Date(file.lastModified).toLocaleDateString(),
        modified: new Date(file.lastModified).toLocaleDateString(),
      });
      setFileToUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileToUpload;
    if (!file) return alert("Please upload a file first.");
    const idToken = sessionStorage.getItem("idToken");
    if (!idToken) return alert("Not logged in.");

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = reader.result?.toString().split(",")[1];
      const payload = {
        fileName: file.name,
        file: base64data,
        tag: newFile.tag,
        subtype: "personal",
      };

      try {
        const res = await fetch("https://nnrmmjb013.execute-api.us-east-2.amazonaws.com/V3-Yes-Auth/UPLOAD-WITH-TAGS", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(await res.text());

        const ext = file.name.split(".").pop()?.toLowerCase();
        const uploaded: File = {
          name: file.name,
          path: `https://docvault-karthik.s3.amazonaws.com/${file.name}`,
          type: ext ? `.${ext}` : "unknown",
          tag: newFile.tag,
          created: new Date().toLocaleDateString(),
          modified: new Date().toLocaleDateString(),
        };
        addNewFile(uploaded);
        alert("✅ Upload successful!");
      } catch (err) {
        alert("❌ Upload failed.");
        console.error(err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTranslate = async (fileName: string) => {
    const idToken = sessionStorage.getItem("idToken");
    if (!idToken) {
      alert("You're not logged in.");
      return;
    }
  
    try {
      const response = await fetch(
        "https://nnrmmjb013.execute-api.us-east-2.amazonaws.com/V3-Yes-Auth/TRANSLATE-V1", // Replace with your real endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            fileName: fileName,
            targetLanguage: "es", // or dynamically change this based on UI
          }),
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
  
      const data = await response.json();
      console.log("✅ Translated file URL:", data.translatedUrl);
      alert("✅ File translated! Check your folder for the translated version.");
    } catch (err) {
      console.error("❌ Translation failed:", err);
      alert("❌ Failed to translate file.");
    }
  };

  const handleDelete = async (fileName: string) => {
    const idToken = sessionStorage.getItem("idToken");
    if (!idToken) {
      alert("You're not logged in.");
      return;
    }
  
    try {
      const response = await fetch("https://nnrmmjb013.execute-api.us-east-2.amazonaws.com/V3-Yes-Auth/DELETE-V2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ fileName }),
      });
  
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }
  
      alert("✅ File deleted successfully!");
      // Optionally: Remove the deleted file from the current list
      // setFiles((prevFiles) => prevFiles.filter(f => f.name !== fileName));
      window.location.reload(); // or refetch files if you prefer
    } catch (err) {
      console.error("❌ Failed to delete file:", err);
      alert("❌ Failed to delete file.");
    }
  };
  
  

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Tag</TableHead>
          <TableHead>Modified</TableHead>
          <TableHead>Created</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map(file => (
          <TableRow key={file.name} onClick={() => onFileSelect(file)} className="cursor-pointer">
            <TableCell>{file.name}</TableCell>
            <TableCell>{file.type}</TableCell>
            <TableCell>
              <p className="border p-1 text-center rounded">{file.tag}</p>
            </TableCell>
            <TableCell>{file.modified}</TableCell>
            <TableCell>{file.created}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-8 w-8">
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleTranslate(file.name)}>
                <ScrollText className="mr-2" /> Translate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(file.name)}>
                <Trash2 className="mr-2" /> Delete
                </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6} className="text-center">
            <Dialog>
              <DialogTrigger>
                <div className="flex items-center justify-center gap-2">
                  <CirclePlus className="text-red" /> Add New File
                </div>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setDragOver(false); setDropped(false); }}
                    onDrop={handleDrop}
                    className={`w-full h-40 border-dashed border-2 flex justify-center items-center rounded ${dragOver ? "bg-gray-200" : "bg-white"}`}
                  >
                    {dropped ? "File Ready!" : "Drag and drop or select a file"}
                  </div>
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const ext = file.name.split(".").pop();
                        setNewFile({
                          name: file.name,
                          path: URL.createObjectURL(file),
                          tag: "",
                          type: ext ? `.${ext}` : "unknown",
                          created: new Date(file.lastModified).toLocaleDateString(),
                          modified: new Date(file.lastModified).toLocaleDateString(),
                        });
                        setFileToUpload(file);
                      }
                    }}
                  />
                  <input
                    placeholder="Tag"
                    className="w-full border p-2 rounded"
                    value={newFile.tag}
                    onChange={(e) => setNewFile({ ...newFile, tag: e.target.value })}
                  />
                  <DialogFooter>
                    <Button type="submit">Upload File</Button>
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
