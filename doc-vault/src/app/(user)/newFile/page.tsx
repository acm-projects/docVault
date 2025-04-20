"use client";

import { Button } from "@/components/ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import React, { DragEvent, useState } from "react";

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

const NewFile = () => {
    const [dragOver, setDragOver] = useState(false);
    const [dropped, setDropped] = useState(false);
    const [file, setFile] = useState<File | null>(null);
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

    const handleLanguageSelect = async (language: string) => {
        if (!file) {
          alert("Please upload a file before translating.");
          return;
        }
      
        setSelectedLanguage(language);
      
        const formData = new FormData();
        formData.append("file", file);
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
    <section id="newFile">
      <div className="text-darkblue max-container padding-container mb-10 mt-8 p-5">
        <h1 className="p-8 text-4xl font-bold text-lighterred">Add a file</h1>
        <form onSubmit={handleSubmit}>
            <div className="p-4 flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-1/2 h-64 shadow-lg p-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ${dragOver ? "bg-middlegray" : "bg-white"}`}>
                    <div 
                        className="flex flex-col items-center justify-center pt-5 pb-6"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
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
                            const selectedFile = e.target.files?.[0];
                            if (selectedFile) {
                              setFile(selectedFile);
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button type="submit" className="text-lg font-normal p-8 w-1/4">Translate</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuGroup className="p-2">Scroll for more languages</DropdownMenuGroup>
                            {languages.map((lang) => (
                                <DropdownMenuItem key={lang} onClick={() => handleLanguageSelect(lang)}>
                                {lang}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </form>
      </div>
    </section>
  );
};

export default NewFile;