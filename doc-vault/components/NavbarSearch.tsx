"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ChevronDown, CircleUserRound, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const icon = <CircleUserRound size={50}/>;

const NavbarAcc = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const { firstName, lastName } = useUser();

    const [searchTerm, setSearchTerm] = useState("");
    const [matchedFiles, setMatchedFiles] = useState<string[]>([]);

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("navQuery", term);
        } else {
            params.delete("navQuery");
        }
        replace(`${pathname}?${params.toString()}`);
        setSearchTerm(term);
    };

    useEffect(() => {
        const fetchFiles = async () => {
            const idToken = sessionStorage.getItem("idToken");
            if (!idToken) return;

            try {
                const res = await fetch("https://nnrmmjb013.execute-api.us-east-2.amazonaws.com/V3-Yes-Auth/LIST-ALL-FILES", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                });

                const data = await res.json();
                if (res.ok && data.files) {
                    const filtered = data.files.filter((file: string) =>
                        file.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    setMatchedFiles(filtered);
                }
            } catch (err) {
                console.error("Error fetching S3 file list:", err);
            }
        };

        if (searchTerm) {
            fetchFiles();
        } else {
            setMatchedFiles([]);
        }
    }, [searchTerm]);

    return (
        <nav className="text-darkblue w-full relative p-10">
            <div className="flexCenter padding-container">
                <div className="flex-1 flex">
                    <div className="relative w-full">
                        <input
                            placeholder="Search"
                            className="peer block w-full rounded-lg py-[9px] pl-10 text-sm outline-2 bg-lightergray placeholder:text-darkblue"
                            defaultValue={searchParams.get("navQuery")?.toString()}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <Search className="absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-darkblue" />

                        {matchedFiles.length > 0 && (
                            <ul className="absolute z-10 bg-white shadow-lg rounded-lg mt-2 w-full border border-gray-300 max-h-60 overflow-auto">
                                {matchedFiles.map((file) => (
                                    <li key={file} className="p-2 hover:bg-gray-100 cursor-pointer text-sm">
                                        {file}
                                    </li>
                                ))}
                            </ul>
                        )}
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
                        <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
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
    );
};

export default NavbarAcc;
