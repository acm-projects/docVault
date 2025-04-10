"use client";

import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

import React, { DragEvent, useState } from "react";

const NewFile = () => {
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
        }
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!file) {
            alert("Please drop a file before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();
            console.log("File uploaded successfully", data);
            alert("File uploaded!");
        } 
        
        catch (error) {
            console.error("Error uploading file:", error);
            alert("Upload failed.");
        }
    }
  
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
                                    const file = e.target.files?.[0];
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