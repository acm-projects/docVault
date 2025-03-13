import Link from 'next/link';
import React from 'react';

const FOOTER_LINKS = [
  { href: '/help', key: 'help', label: 'Help' },
  { href: '/features', key: 'features', label: 'Features' },
  { href: '/about-us', key: 'about-us', label: 'About Us' },
  { href: '/contact', key: 'contact ', label: 'Contact' },
];

const Footer = () => {
  return (
    <footer className="text-white bg-red w-full p-10">
      <div className="mx-auto flexBetween padding-container">
        <Link className="text-2xl font-semibold" href="/">
          docVault
        </Link>

        <ul className="gap-4 lg:gap-12 flex">
          {FOOTER_LINKS.map((link) => (
            <Link href={link.href} key={link.key} className="regular-12 cursor-pointer transition-all hover:font-bold">
              {link.label}
            </Link>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer;