import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { Menu, ChevronDown, ChevronRight } from 'lucide-react'; // Thay thế icon

// Tách data ra ngoài để component gọn gàng
const CATEGORIES = [
  { name: 'Cabinet Table' },
  { name: 'Electronic' },
  {
    name: 'Fashion',
    children: ['Men Fashion', 'Women Fashion', 'Kids Fashion', 'Footwear', 'Watches', 'Bags'],
  },
  { name: 'Furniture' },
  { name: 'Headphones' },
  { name: 'Leather Watch' },
  { name: "Men's Clothes" },
  { name: 'Silver Earrings' },
  { name: 'Sneakers Shoes' },
  { name: 'Sunglasses' },
  { name: "Women's Clothes" },
  { name: 'School Bag' },
];

export default function HeaderNavCategory() {
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(false);

  const menuRender = (
    <div
      className="relative flex bg-white shadow-xl border border-gray-100 mt-2"
      onMouseLeave={() => setHovered(null)}
    >
      {/* CỘT DANH MỤC CHÍNH */}
      <div className="w-64 py-2 bg-white">
        {CATEGORIES.map((item, index) => {
          const active = hovered === item.name;
          return (
            <div
              key={index}
              className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm transition-all duration-200
                ${active ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'}
              `}
              onMouseEnter={() => setHovered(item.children ? item.name : null)}
            >
              <span>{item.name}</span>
              {item.children && (
                <ChevronRight size={14} className={active ? 'text-red-600' : 'text-gray-400'} />
              )}
            </div>
          );
        })}
      </div>

      {/* SUBMENU (Hiện ra bên phải) */}
      {hovered && (
        <div
          className="absolute left-full top-0 w-72 h-full bg-white border-l border-gray-100 p-5 shadow-lg z-50 overflow-y-auto"
          onMouseEnter={() => setHovered(hovered)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="pb-3 border-b border-gray-100 mb-3">
            <h4 className="text-base font-bold text-gray-800">Popular in {hovered}</h4>
            <p className="text-xs text-gray-500 mt-1">Top picks curated for you</p>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {CATEGORIES.find((c) => c.name === hovered)?.children?.map((sub, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-2 py-2 text-sm text-gray-600
                       cursor-pointer rounded-md transition-all group hover:bg-gray-50 hover:text-red-600"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-red-600 transition-colors" />
                <span>{sub}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      trigger={['click']}
      dropdownRender={() => menuRender}
      overlayClassName="pt-2" // Thêm padding top để dropdown không dính sát
    >
      <div
        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 transition-colors
                   px-5 py-3.5 text-white cursor-pointer shadow-md w-[260px] rounded-t-md"
      >
        <Menu size={20} />
        <span className="font-bold text-sm tracking-wide flex-1">SHOP BY CATEGORIES</span>
        <ChevronDown size={16} />
      </div>
    </Dropdown>
  );
}
