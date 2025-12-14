import React from 'react';
import { Truck, RotateCcw, Gift, PhoneCall } from 'lucide-react';

const ServiceHighlights = () => {
  return (
    <div className="w-full mt-20">
      <div className="max-w-[1400px] mx-auto px-10 py-6 shadow bg-white">
        <div className="flex items-center justify-between gap-4">
          {/* Item 1 */}
          <div className="flex items-center justify-center gap-4">
            <Truck className="text-6xl text-red-700 w-16 h-16" strokeWidth={1} />
            <div className="flex flex-col items-start justify-center gap-2">
              <p className="text-text-strong font-semibold">Worldwide Shipping</p>
              <p className="text-text-soft">Order Above $100</p>
            </div>
          </div>

          <span className="block w-px h-12 bg-gray-400 mx-1"></span>

          {/* Item 2 */}
          <div className="flex items-center justify-center gap-4">
            <RotateCcw className="text-6xl text-red-700 w-16 h-16" strokeWidth={1} />
            <div className="flex flex-col items-start justify-center gap-2">
              <p className="text-text-strong font-semibold">Money Back Guarantee</p>
              <p className="text-text-soft">Guarantee With In 30 Days</p>
            </div>
          </div>

          <span className="block w-px h-12 bg-gray-400 mx-1"></span>

          {/* Item 3 */}
          <div className="flex items-center justify-center gap-4">
            <Gift className="text-6xl text-red-700 w-16 h-16" strokeWidth={1} />
            <div className="flex flex-col items-start justify-center gap-2">
              <p className="text-text-strong font-semibold">Offers And Discounts</p>
              <p className="text-text-soft">Back Returns In 7 Days</p>
            </div>
          </div>

          <span className="block w-px h-12 bg-gray-400 mx-1"></span>

          {/* Item 4 - Icon Phone đỏ nhạt hơn tí như bản gốc */}
          <div className="flex items-center justify-center gap-4">
            <PhoneCall className="text-6xl text-red-500 w-16 h-16" strokeWidth={1} />
            <div className="flex flex-col items-start justify-center gap-2">
              <p className="text-text-strong font-semibold">24/7 Support Services</p>
              <p className="text-text-soft">Any Time Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHighlights;
