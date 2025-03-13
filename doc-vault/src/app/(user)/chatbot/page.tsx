"use client"

import { MessageSquare } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const Chatbot = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
        
    const handleSearch = (searchTerm: string) => {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) 
        {
            params.set("query", searchTerm);
        }
        
        else 
        {
            params.delete("query");
        }
        
        replace(`${pathname}?${params.toString()}`);
    };

  return (
    <div className="max-container padding-container mt-8">
        <div className="text-white font-medium bg-lighterred rounded-xl p-4 lg:h-1/2 h-full">
            <div className="bg-lightergray text-darkblue rounded-3xl w-1/2 m-5 p-10">
                <span>What can I help with? Try asking, “When is my passport due?” or “Translate this document.”</span>
            </div>

            <div className="m-5 flex-1 flex">
                <div className="relative w-full"> 
                    {/*FIX BELOW -- When input entered, open chatbot pop-up window*/}
                    <input
                        placeholder="Ask a question..."
                        className="peer block w-full rounded-xl py-[12px] pl-5 text-sm outline-2 bg-lightergray text-darkblue placeholder:text-darkblue"
                        defaultValue={searchParams.get("query")?.toString()}
                        onChange={(e) => {
                            handleSearch(e.target.value);
                        }}
                    />
                    <MessageSquare className="absolute top-1/2 right-5 h-[18px] w-[18px] -translate-y-1/2 text-darkblue" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chatbot