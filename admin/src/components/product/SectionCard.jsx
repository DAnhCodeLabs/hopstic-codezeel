import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Icon mới chuẩn Lucide

const SectionCard = ({ title, children }) => {
  // Tạo ref để điều khiển Swiper bên trong
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="w-full mt-16">
      <div className="max-w-[1400px] mx-auto p-6 bg-white shadow-sm rounded-sm">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
          <div className="relative">
            <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">{title}</h2>
            <span className="absolute left-0 -bottom-2.5 w-16 h-1 bg-red-600 rounded-full" />
          </div>

          {/* Custom Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              ref={prevRef}
              className="p-2 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition-all cursor-pointer text-gray-600"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              ref={nextRef}
              className="p-2 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition-all cursor-pointer text-gray-600"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Render Children (CommonSwiper) và truyền ref vào nó
          kỹ thuật React.cloneElement giúp component con nhận được prop từ cha
        */}
        {React.cloneElement(children, {
          prevRef,
          nextRef,
        })}
      </div>
    </section>
  );
};

export default SectionCard;
