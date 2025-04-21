"use client";

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FileItem = {
  name: string;
  path: string;
  type: string;
  tag: string;
  created: string;
  modified: string;
};

interface NewFileProps {
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

import React, { DragEvent, useState } from "react";

const NewFile = ({folders, groupedFiles, addFolders, setGroup}: NewFileProps) => {
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

    const [dragOver, setDragOver] = useState(false);
    const [dropped, setDropped] = useState(false);
    const [file, setFile] = useState<File | null>(null);

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
            setFile(file);
        }
    }

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
          const base64data = reader.result?.toString().split(",")[1]; // remove data:<type>;base64,
      
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
          setTimeout(()=>{
            fetchFiles()
            console.log("done")
          }, 5000)
        };
        
        reader.readAsDataURL(file); // This triggers reader.onloadend
      };
      
  
    return (
    <section id="newFile">
      <div className="text-darkblue max-container padding-container mb-10 mt-8">
        <h1 className="p-4 text-4xl font-bold text-lighterred">Add a file</h1>
        <div className="p-4">
            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Drag + Drop</TabsTrigger>
                    <TabsTrigger value="password">Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                    <CardHeader>
                        <CardTitle>Drag + Drop</CardTitle>
                        <CardDescription>
                            Drag in your files here. Click save when you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                            <div 
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`flex w-full h-[300px] border-dashed border border-gray items-center justify-center ${dragOver ? "bg-middlegray" : "bg-white"}`}
                            >
                                <p className="text-gray text-xl">
                                    {dropped ? "File ready!" : "Drag a file here"}
                                </p>
                            </div>

                            {file && (
                                <div className="border rounded-xl p-4 shadow-md bg-white text-sm text-gray-700">
                                    <p><strong>File name:</strong> {file.name}</p>
                                    <p><strong>File size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
                                    <p><strong>Type:</strong> {file.type || "Unknown"}</p>
                                </div>
                            )}

                            <div className="flex justify-center">
                                <Button type="submit" className="w-1/2">Save Changes</Button>
                            </div>
                        </form>
                    </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                    <CardHeader>
                        <CardTitle>Upload</CardTitle>
                        <CardDescription>
                            Select your file below. Click save when you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                            <input
                                type="file"
                                className="col-span-3 p-2"
                                onChange={(e) => {
                                  const selectedFile = e.target.files?.[0];
                                  if (selectedFile) {
                                    setDropped(true);
                                    setFile(selectedFile);
                                  }
                                }}
                            />
                            
                            <div className="flex justify-center">
                                <Button type="submit" className="w-1/2">Save Changes</Button>
                            </div>
                        </form>
                    </CardContent>
                    </Card>
                </TabsContent>
                </Tabs>
        </div>
      </div>
    </section>
  );
};

export default NewFile;