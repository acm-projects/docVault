"use client"
import Link from 'next/link';
import React from 'react';
import { ChevronDown, CircleUserRound } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/Button';
import { useUser } from '@/context/UserContext';

const icon = <CircleUserRound size={50} />;

const NavbarAcc = () => {
  const { firstName, lastName } = useUser();
  
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
        </ul>
      </div>
    </nav>
  )
}

export default NavbarAcc;