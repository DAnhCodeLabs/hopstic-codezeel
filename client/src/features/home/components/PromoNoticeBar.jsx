import React from 'react';
import { Truck } from 'lucide-react';

const PromoNoticeBar = () => {
  return (
    <div className="w-full mt-10">
      <div className="max-w-[1400px] mx-auto bg-primary p-4 rounded-md shadow-md">
        <div className="flex items-center justify-between gap-6 px-4">
          <div className="flex items-center gap-3">
            {/* Dùng icon thay ảnh png nếu muốn, hoặc giữ ảnh */}
            <Truck className="text-white w-10 h-10" />
            <p className="text-white text-3xl font-bold uppercase italic">Free Shipping</p>
          </div>
          <span className="block w-px h-10 bg-white"></span>
          <div>
            <p className="text-white text-lg font-medium">
              Free delivery now on your first order and over 120.000đ
            </p>
          </div>
          <span className="block w-px h-10 bg-white"></span>
          <div>
            <p className="text-white text-3xl font-bold uppercase italic">- ONLY 120.000đ *</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoNoticeBar;
