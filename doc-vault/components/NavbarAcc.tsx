"use client"
import Link from 'next/link';
import React from 'react';
import { ChevronDown, CircleUserRound } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

const userInfo = [
  { name: "Your Name", icon: <CircleUserRound size={50}/> },
];

const NavbarAcc = () => {
  return (
    <nav className="text-darkblue relative p-10">
      <div className="mx-auto flexBetween padding-container">
        <Link className="text-3xl font-semibold" href="/">
          docVault
        </Link>

        <ul className="gap-4 lg:gap-12 flex">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flexCenter">
                <Button className="text-darkblue bg-white shadow-none font-light text-lg hover:bg-white transition-all hover:font-bold">
                    <ChevronDown className="ml-auto" />
                    <span>{userInfo[0].name}</span>
                </Button>
                <span>{userInfo[0].icon}</span>
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
        </ul>
      </div>
    </nav>
  )
}

export default NavbarAcc;