"use client";
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/chatAccordion"
import {useState, useEffect, useRef} from 'react'
import {Send} from "lucide-react"

const Chat = () => {
    const[messages, setMessages] = useState([
        {text: 'Hello, how can I help you today?', user:false}
    ]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
   
   
    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter' && !event.shiftKey && message != '') {
            handleMessage();
        }
    }
   
    function handleMessage() {
        if (message != '') {
            setMessage('')
            setMessages([...messages, {text:message, user:true}])
            setLoading(true)
            send(message)
        }
    }
   
    async function send(s: string) {
        const response = await fetch('http://localhost:8080/chat', {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({"query": s}),
            headers: {
                'Content-type':'application/json',
            }
        }).then(response => response.json()).then(data => {
            setLoading(false)
            setMessages([...messages, {text: s, user:true}, {text:data.POST, user:false}])
        })
    }
   
    const messagesEnd = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
    messagesEnd.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])


  return (
    <Accordion type='single' collapsible className='relative z-40 rounded-md'>
        <AccordionItem value='item-1'>
            <div className='fixed w-80 right-10 bottom-10 border-red overflow:hidden shadow-2xl rounded-md'>
                <AccordionTrigger className='px-6 border-2 border-red rounded-md text-darkblue bg-white'>
                    <div className='text-sm'>
                        Chat with docVault
                    </div>
                </AccordionTrigger>
                <AccordionContent className='rounded-md'>
                    <div className='flex flex-col h-96 rounded-md bg-middlegray border-t-0 border-red border-2'>
                        <div className='px-2 py-3 flex-1 space-y-5 flex flex-col flex-grow items-start overflow-y-auto wrap-break-word'>
                            {messages.map((message,index) => (
                                <div key={index} className={`${message.user ? 'text-sm bg-lighterred text-white rounded-xl p-2 flex self-end' : 'text-sm bg-gray text-darkblue rounded-xl p-2'}`}>
                                    {message.text}
                                </div>
                            ))}
                            {loading && (<div className='flex space-x-1 justify-center items-center bg-middlegray'>
                                <span className='sr-only'>Loading...</span>
                                <div className='h-2 w-2 bg-gray rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                <div className='h-2 w-2 bg-gray rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                <div className='h-2 w-2 bg-gray rounded-full animate-bounce'></div>
                            </div>)}
                            <div ref={messagesEnd}/>
                        </div>
                        <div className='px-2 pb-2 flex flex-row'>
                            <input
                            placeholder="Ask a question..."
                            className="peer block w-full rounded-l-xl text-sm outline-2 bg-lightergray text-darkblue placeholder:text-darkblue px-4 outline-none h-8"
                            onChange={event => setMessage(event.target.value)}
                            onKeyDown={event => onKeyDown(event)}
                            value={message}
                            />
                            <Send
                            className='bg-lightergray size-8 pl-0 pr-2 rounded-r-xl hover:stroke-gray transition-all'
                            onClick={function() {handleMessage();}}
                            />
                        </div>
                    </div>
                </AccordionContent>
            </div>
        </AccordionItem>
    </Accordion>
  )
}


export default Chat;
