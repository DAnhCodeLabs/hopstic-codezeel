import React from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Collections', path: '/collections' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const HeaderNavItems = () => {
  return (
    <nav className="hidden md:flex items-center gap-8 ml-8">
      {navLinks.map((link) => (
        <Link
          key={link.label}
          to={link.path}
          className="text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors uppercase tracking-tight"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default HeaderNavItems;
