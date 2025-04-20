import React from 'react';
import {Menu, CircleUserRound} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const extensionNav = () => {
    return (
        <nav className="text-white bg-red p-5 flex flex-wrap items-center justify-between">
            <div className="text-2xl font-semibold">
                <Image src="/LogoWhite.png" alt="docVault" height={80} width={160}/>
            </div>
            <div className="flex flex-row space-x-5">
                <Link href="account.html">
                    <CircleUserRound className="hover:stroke-2 stroke-1 transition-all" size={30}/>
                </Link>
                <Link href="tools.html">
                    <Menu className="hover:stroke-2 stroke-1 transition-all" size={30}/>
                </Link>
            </div>
        </nav>
    )
}

export default extensionNav;