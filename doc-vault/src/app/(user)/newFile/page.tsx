"use client";

import { Button } from "@/components/ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import React, { DragEvent, useState } from "react";

type FileItem = {
  name: string;
  path: string;
  type: string;
  tag: string;
  created: string;
  modified: string;
};

interface PersonalProps {
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

const NewFile = ({folders, groupedFiles, addFolders, setGroup}: PersonalProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [dropped, setDropped] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    setDropped(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    setDropped(true);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            console.log("Dropped file: ", file);
        }
    }

    const fetchFiles = async () => {
  
      const idToken = sessionStorage.getItem("idToken");
      if (!idToken) {
        return;
      }
  
      try {
        const res = await fetch(
          "https://nnrmmjb013.execute-api.us-east-2.amazonaws.com/V3-Yes-Auth/GET-ALL-FILES",
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
  
        
  
        if (!res.ok) {
          const errText = await res.text();
          return;
        }
  
        const result = await res.json();
  
  
        const groupedRaw: Record<string, any[]> = result;
  
        if (!groupedRaw || typeof groupedRaw !== "object") {
          
          return;
        }
  
        const groupedCleaned: { [key: string]: FileItem[] } = {};
  
        for (const [subsubtype, files] of Object.entries(groupedRaw)) {
          for (let i = 0; i < files.length; i++) {
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
          groupedCleaned[subsubtype.toLowerCase()] = files.map((file: any) => {
            const extension = file.document_name.split(".").pop()?.toLowerCase();
            return {
              name: file.document_name,
              path: file.s3_path.replace(
                "s3://docvault-karthik/",
                "https://docvault-karthik.s3.amazonaws.com/"
              ),
              type: `.${extension}`,
              tag: file.document_type || "Unknown",
              created: new Date(file.upload_date).toLocaleDateString(),
              modified: new Date(file.upload_date).toLocaleDateString(),
            };
          });
        }
  
        
        setGroup(groupedCleaned);
      } catch (err) {
        
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please drop or select a file first.");
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
      };

      try {
        const response = await fetch("https://nnrmmjb013.execute-api.us-east-2.amazonaws.com/V3-Yes-Auth/UPLOAD", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }

        const data = await response.json();
        console.log("✅ File uploaded:", data);
        alert("✅ File uploaded successfully!");
      } catch (err) {
        console.error("❌ Upload failed:", err);
        alert("❌ Upload failed. See console for details.");
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <section id="newFile">
      <div className="text-darkblue max-container padding-container mb-10 mt-8 p-5">
        <h1 className="p-8 text-4xl font-bold text-lighterred">Add a file</h1>
        <form onSubmit={handleSubmit}>
          <div className="p-4 flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center w-1/2 h-64 shadow-lg p-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ${dragOver ? "bg-middlegray" : "bg-white"}`}
            >
              <div
                className="flex flex-col items-center justify-center pt-5 pb-6"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <svg className="w-8 h-8 mb-4 text-darkblue" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-darkblue">{dropped ? "File uploaded!" : "Click to upload or drag and drop"}</p>
              </div>
              <input 
                id="dropzone-file" 
                type="file" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log("Selected file: ", file);
                    setFile(file);
                    setDropped(true);
                  }
                }}
              />
            </label>
          </div>
          <div className="flex w-full justify-center p-4">
            <div className="flex w-1/2 justify-center items-center gap-x-10">
              <Button type="submit" className="text-lg font-normal p-8 w-1/4">Save File</Button>
              <p className="flex font-light"> OR </p>
              <Button type="button" className="text-lg font-normal p-8 w-1/4">Translate</Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewFile;
