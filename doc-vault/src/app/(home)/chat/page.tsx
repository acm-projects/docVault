"use client";
import React from 'react'
import {useState} from 'react'
import {ArrowLeft, MessageSquare} from 'lucide-react';
import { ScrollArea } from "radix-ui";
import Link from 'next/link';

const About = () => {
    const [message, setMessage] = useState('');
    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter' && !event.shiftKey)
            alert(message)
    }
    function click() {
        alert(message);
    }
  return (
    <div className='max-container padding-container flex items-start h-dvh pb-10'>
        <div className='pl-10 pt-4 pr-10 h-1/2'>
            <Link href="/">
                <ArrowLeft className="hover:stroke-2 stroke-1 transition-all" size={60}/>
            </Link>
        </div>
        <div className='font-medium bg-gray rounded-t-xl h-3/4 w-full'>
        <div className='font-medium bg-gray rounded-xl p-4 h-full overflow-y-auto'>
            <div className='text-7xl'>hello</div>
            <div className='text-7xl'>hello</div>
            <div className='text-7xl'>hello</div>
            <div className='text-7xl'>hello</div>
            <div className='text-7xl'>hello</div>
            <div className='text-7xl'>hello</div>
            <div className='text-7xl'>hello</div>
            <div className='text-7xl'>hello</div>
            <div className='text-7xl'>hello</div>
            <div className='text-7xl'>hello</div>
            <div className='text-7xl'>hello</div>
            <div className='text-7xl'>hello</div>
            <div className='text-7xl'>hello</div>
        </div>
        <div className="relative w-full pt-0 p-4 bg-gray rounded-b-xl">
            <div>
            <input
                placeholder="Ask a question..."
                className="peer block w-full rounded-xl py-[12px] pl-5 text-sm outline-2 bg-lightergray text-darkblue placeholder:text-darkblue"
                onChange={event => setMessage(event.target.value)}
                onKeyDown={event => onKeyDown(event)}
            />
            <MessageSquare 
                className="absolute right-5 top-1/2 h-[18px] w-[18px] -translate-y-4 -translate-x-2 hover:stroke-gray transition-all"
                onClick={click}
            />
            </div>
        </div>
        </div>
    </div>
  )
}

export default About