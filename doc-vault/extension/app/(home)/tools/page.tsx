import React from 'react'
import CustomBtn from "@/components/ui/customBtn";
import Link from "next/link";
import { ChevronLeft, MessageCircle, ScrollText, Settings } from 'lucide-react';

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
                <CustomBtn 
                    type="submit"
                    title="Settings"
                    variant="btn_gray"
                >
                    <Settings />
                </CustomBtn>
                <CustomBtn 
                    type="submit"
                    title="Translate"
                    variant="btn_gray"
                >
                    <ScrollText />
                </CustomBtn>
                <CustomBtn 
                    type="submit"
                    title="Chatbot"
                    variant="btn_gray"
                >
                    <MessageCircle />
                </CustomBtn>
            </div>
        </div>
    )
}

export default tools