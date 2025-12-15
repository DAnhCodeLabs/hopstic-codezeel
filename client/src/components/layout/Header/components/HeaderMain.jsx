import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '@/assets/assets';

// Import Components
import InputCommon from '@/components/common/InputCommon';
import HeaderAuth from './HeaderAuth';
import HeaderIcons from './HeaderIcons';

export default function HeaderMain() {
  return (
    <div className="w-full bg-white pt-4 pb-0">
      {' '}
      {/* Padding bottom = 0 để nav dính dưới */}
      <div className="max-w-[1400px] mx-auto">
        {/* TOP SECTION: Logo, Search, Auth, Icons */}
        <div className="flex items-center justify-between gap-8 mb-2">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            {/* Giữ nguyên assets.logo của bạn */}
            <img src={assets.logo} alt="Shop Logo" className="h-10 w-auto object-contain" />
          </Link>

          {/* Search Bar */}
          <div className="flex items-center gap-2 flex-1">
            <InputCommon
              placeholder="Search ..."
              className="w-full"
              size="large"
              variant="search"
              enterButton="Search"
              onSearch={(val) => console.log(val)}
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6 shrink-0">
            <HeaderAuth />
            <span className="block h-8 w-px bg-gray-200"></span>
            <HeaderIcons />
          </div>
        </div>
      </div>
    </div>
  );
}
