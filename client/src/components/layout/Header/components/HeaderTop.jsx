import React from 'react';

export default function HeaderTop() {
  return (
    <div className="w-full border-b py-1 border-gray-300 bg-white">
      <div className="max-w-[1400px] mx-auto flex flex-col px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
          <p className="text-gray-500">
            Limited-Time Offers : Mid-Summer Season Sale Live Now –{' '}
            <a className="underline hover:no-underline font-medium text-gray-800" href="#">
              Shop Now
            </a>
          </p>

          <div className="flex items-center gap-4 sm:gap-6 text-gray-500">
            <p className="cursor-pointer hover:text-red-600 transition-colors">Store Locator</p>
            <p className="cursor-pointer hover:text-red-600 transition-colors">Order Tracking</p>
            <p className="cursor-pointer hover:text-red-600 transition-colors">admin@gmail.com</p>
            <p className="cursor-pointer hover:text-red-600 transition-colors">+84 123456789</p>
          </div>
        </div>
      </div>
    </div>
  );
}
