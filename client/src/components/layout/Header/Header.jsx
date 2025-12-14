import React from 'react';
import HeaderMain from './components/HeaderMain';
import HeaderTop from './components/HeaderTop';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm z-50 relative">
      <HeaderTop />
      <HeaderMain />
    </header>
  );
}
