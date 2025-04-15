"use client"

import { MessageSquare, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Modal from "react-modal";
import { motion } from "framer-motion";

const Chatbot = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleClick = () => {
        setIsModalOpen(true);
    };

  return (
    <div className="max-container padding-container mt-8">
        <div className="text-white font-medium bg-lighterred rounded-xl p-4 lg:h-1/2 h-full">
            <div className="bg-lightergray text-darkblue rounded-3xl w-1/2 m-5 p-10">
                <span>What can I help with? Try asking, “When is my passport due?” or “Translate this document.”</span>
            </div>

            <div className="m-5 flex-1 flex">
                <div className="relative w-full"> 
                    <input
                        placeholder="Ask a question..."
                        className="peer block w-full rounded-xl py-[12px] pl-5 text-sm outline-2 bg-lightergray text-darkblue placeholder:text-darkblue"
                        defaultValue={searchParams.get("query")?.toString()}
                        onChange={(e) => {
                            handleSearch(e.target.value);
                        }}
                    />
                    <MessageSquare onClick={handleClick} className="absolute top-1/2 right-5 h-[18px] w-[18px] -translate-y-1/2 text-darkblue" />

                    <Modal 
                        ariaHideApp={false} 
                        isOpen={isModalOpen} 
                        onRequestClose={() => setIsModalOpen(false)} 
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 900 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 200 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="w-full max-w-4xl"
                        >
                            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full">
                                <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900">
                                    <X size={24} />
                                </button>
                                
                                <h2 className="text-lg font-semibold mb-4">Chatbot</h2>
                                <div className="w-full h-[800px]">
                                    <p>This is where the chatbot would be!</p>
                                </div>
                            </div>
                        </motion.div>
                    </Modal>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chatbot