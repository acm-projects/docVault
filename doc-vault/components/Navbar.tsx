"use client"
import Link from 'next/link';
import CustomBtn from './ui/customBtn';
import React from 'react';

const NAV_LINKS = [
  { href: '/features', key: 'features', label: 'Features' },
  { href: '/about-us', key: 'about-us', label: 'About Us' },
  { href: '/contact', key: 'contact ', label: 'Contact' },
];

const Navbar = () => {
  return (
    <nav className="text-darkblue relative py-5">
      <div className="mx-auto flexBetween padding-container">
        <Link className="text-3xl font-semibold" href="/">
          docVault
        </Link>

        <ul className="gap-4 lg:gap-12 flex">
          {NAV_LINKS.map((link) => (
            <Link href={link.href} key={link.key} className="regular-16 cursor-pointer flexCenter transition-all hover:font-bold">
              {link.label}
            </Link>
          ))}

          <Link href="/login">
            <CustomBtn 
              type="button"
              title="Log In"
              variant="btn_red"
            />
          </Link>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;