import Link from 'next/link';
import Button from './ui/Button';
import React from 'react'
import { NAV_LINKS } from '../constants';

const Navbar = () => {
  return (
    <nav className="bg-red flex items-center justify-between max-container padding-container relative z-30 py-5">
      <Link href="/">
        docVault
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.key} className="regular-16 text-darkblue flex items-center justify-center cursor-pointer pb-1.5 transition-all hover:font-bold hover:text-black">
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flex items-center justify-center hidden">
        <Button 
          type="button"
          title="Login"
          variant="btn_red"
        />
      </div>
    </nav>
  )
}

export default Navbar;