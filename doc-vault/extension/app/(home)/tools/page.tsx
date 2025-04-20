"use client"

import React, { useState } from 'react'
import CustomBtn from "@/components/ui/customBtn";
import Link from "next/link";
import { ChevronLeft, MessageCircle, ScrollText, Settings } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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

const tools = () => {
    return (
        <div className="text-darkblue text-lg p-4 flex flex-col justify-center items-center space-y-2">
            <div className='relative w-full py-4'>
                <Link className="flex" href="index.html">
                    <ChevronLeft />
                    <span className="px-5 text-sm">Back</span>
                </Link>
                <div className="text-lg font-semibold flex justify-center align-center">
                    Tools
                </div>
            </div>
            <div className='w-1/2 flex flex-col gap-y-5 pb-10'>
                <Link href="http://localhost:3000/settings" target='_blank'>
                    <CustomBtn 
                        type="button"
                        title="Settings"
                        variant="btn_gray"
                    >
                        <Settings className='mr-4' />
                    </CustomBtn>
                </Link>
                
                <Link href="http://localhost:3000/personal" target='_blank'>
                    <CustomBtn 
                        type="button"
                        title="Translate"
                        variant="btn_gray"
                    >
                        <ScrollText className='mr-2' />
                    </CustomBtn>
                </Link>

                <Link href="http://localhost:3000/personal" target='_blank'>
                    <CustomBtn 
                        type="button"
                        title="Chatbot"
                        variant="btn_gray"
                    >
                        <MessageCircle className='mr-4' />
                    </CustomBtn>
                </Link>
            </div>
        </div>
    )
}

export default tools