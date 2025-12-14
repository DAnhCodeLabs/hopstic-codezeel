import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react'; // Dùng Lucide chuẩn

export default function HeaderIcons() {
  return (
    <div className="flex items-center justify-center gap-5">
      {/* HEART */}
      <div className="relative w-6 h-6 group cursor-pointer">
        <Heart
          className="w-full h-full text-gray-700 transition-transform duration-300 group-hover:text-red-600 group-hover:scale-110"
          strokeWidth={1.5}
        />
        <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white">
          3
        </span>
      </div>

      {/* CART */}
      <div className="relative w-6 h-6 group cursor-pointer">
        <ShoppingCart
          className="w-full h-full text-gray-700 transition-transform duration-300 group-hover:text-red-600 group-hover:scale-110"
          strokeWidth={1.5}
        />
        <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white">
          5
        </span>
      </div>
    </div>
  );
}
