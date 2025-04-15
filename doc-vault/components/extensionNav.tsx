import React from 'react';
import {Menu, CircleUserRound} from 'lucide-react';
import Link from 'next/link';

const extensionNav = () => {
    return (
        <nav className="text-white bg-red p-5 flex flex-wrap items-center justify-between">
            <div className="text-2xl font-semibold">
                docVault
            </div>
            <div className="flex flex-row space-x-5">
                <Link href="http://localhost:3000/account" target="_blank">
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