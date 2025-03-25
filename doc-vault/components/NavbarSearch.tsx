"use client"
import Link from 'next/link';
import React from 'react';
import { ChevronDown, CircleUserRound, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const icon = <CircleUserRound size={50}/>;

const NavbarAcc = () => {
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    const handleSearch = (searchTerm: string) => {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) 
        {
            params.set("navQuery", searchTerm);
        }

        else 
        {
            params.delete("navQuery");
        }

        replace(`${pathname}?${params.toString()}`);
    };

    const { firstName, lastName } = useUser();

  return (
    <nav className="text-darkblue w-full relative p-10">
      <div className="flexCenter padding-container">

        <div className="flex-1 flex">
          <div className="relative w-full"> 
                <input
                    placeholder="Search"
                    className="peer block w-full rounded-lg py-[9px] pl-10 text-sm outline-2 bg-lightergray placeholder:text-darkblue"
                    defaultValue={searchParams.get("navQuery")?.toString()}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                />
                <Search className="absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-darkblue" />
            </div>
        </div>
        
        <div className="flex justify-end gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flexCenter ml-20">
                    <Button className="text-darkblue bg-white shadow-none font-light text-lg transition-all hover:font-bold hover:bg-white">
                        <ChevronDown className="ml-2" />
                        <span>{firstName} {lastName}</span>
                    </Button>
                    <span>{icon}</span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width]"
                >
                <Link href="/account">
                    <DropdownMenuItem>
                    <span>Account</span>
                    </DropdownMenuItem>
                </Link>
                    
                <Link href="/settings">
                    <DropdownMenuItem>
                    <span>Settings</span>
                    </DropdownMenuItem>
                </Link>
                    
                <Link href="#">
                    <DropdownMenuItem>
                    <span>Sign out</span>
                    </DropdownMenuItem>
                </Link>
                
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default NavbarAcc;