"use client";
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/chatAccordion"
import {useState, useEffect, useRef} from 'react'

const Chat = () => {
    const[messages, setMessages] = useState([
        {text: 'Hello, how can I help you today?', user:false}
    ]);
    const [message, setMessage] = useState('');
    
    
    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter' && !event.shiftKey) {
            handleMessage();
        }
    }
    
    function handleMessage() {
        setMessage('')
        send(message)
        setMessages([...messages, {text: message, user: true}])
    }

    function recieve() {
        useEffect(() => {
            fetch("http://localhost:8080/chat")
              .then((response) => response.json())
              .then((data) => {
                console.log(data)
              });
          }, []);
        }
    
    
        async function send(s: string) {
            const response = await fetch('http://localhost:8080/chat', {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify({"query": s}),
                headers: {
                    'Content-type':'application/json',
                }
            })
        }    

  return (
    <Accordion type='single' collapsible className='relative bg-white shadow'>
        <AccordionItem value='item-1'>
            <div className='fixed w-80 right-10 bottom-10 border-red overflow:hidden overflow-y-auto bg-white'>
                <AccordionTrigger className='px-6 border-2 border-red rounded-md text-darkblue'>
                    <div className='text-sm bg-white'>
                        Chat with docVault
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className='flex flex-col h-96 bg-gray rounded-md'>
                        <div className='px-2 py-3 flex-1 space-y-5 flex flex-col flex-grow items-start overflow-y-auto wrap-break-word'>
                            {messages.map((message,index) => (
                                <div key={index} className={`${message.user ? 'text-sm bg-lighterred rounded-xl p-2 flex self-end' : 'text-sm bg-lightergray rounded-xl p-2'}`}>
                                    {message.text}
                                </div>
                            ))}
                        </div>
                        <div className='px-2 pb-2'>
                            <input
                            placeholder="Ask a question..."
                            className="peer block w-full rounded-xl text-sm outline-2 bg-lightergray text-darkblue placeholder:text-darkblue px-4 outline-none h-8"
                            onChange={event => setMessage(event.target.value)}
                            onKeyDown={event => onKeyDown(event)}
                            value={message}
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