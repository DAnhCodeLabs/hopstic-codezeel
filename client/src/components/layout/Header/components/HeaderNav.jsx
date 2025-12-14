import React from 'react';
import HeaderNavCategory from './HeaderNavCategory';
import HeaderNavItems from './HeaderNavItems';

const HeaderNav = () => {
  return (
    <div className="w-full border-t border-gray-100 mt-4">
      <div className="flex items-center">
        {/* Category bên trái */}
        <div className="relative -mb-px">
          {' '}
          {/* Hack nhỏ để khớp border */}
          <HeaderNavCategory />
        </div>

        {/* Menu Items bên phải */}
        <HeaderNavItems />
      </div>
    </div>
  );
};

export default HeaderNav;
