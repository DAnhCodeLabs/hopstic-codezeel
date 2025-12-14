import React from 'react';
import CommonSwiper from '@/components/common/CommonSwiper';
import SectionCard from '@/components/product/SectionCard';

// Mock data giữ nguyên
const mockCategories = [
  { id: 1, name: 'Electronics', image: 'https://picsum.photos/300/300?cat=1', total: 120 },
  { id: 2, name: 'Fashion', image: 'https://picsum.photos/300/300?cat=2', total: 98 },
  { id: 3, name: 'Home & Living', image: 'https://picsum.photos/300/300?cat=3', total: 76 },
  { id: 4, name: 'Beauty & Health', image: 'https://picsum.photos/300/300?cat=4', total: 65 },
  { id: 5, name: 'Sports & Outdoor', image: 'https://picsum.photos/300/300?cat=5', total: 43 },
  { id: 6, name: 'Shoes', image: 'https://picsum.photos/300/300?cat=6', total: 88 },
  { id: 7, name: 'Bags & Accessories', image: 'https://picsum.photos/300/300?cat=7', total: 54 },
  { id: 8, name: 'Mobile Phones', image: 'https://picsum.photos/300/300?cat=8', total: 39 },
  { id: 9, name: 'Laptops', image: 'https://picsum.photos/300/300?cat=9', total: 22 },
  { id: 10, name: 'Headphones', image: 'https://picsum.photos/300/300?cat=10', total: 31 },
  { id: 11, name: 'Smart Watches', image: 'https://picsum.photos/300/300?cat=11', total: 27 },
  { id: 12, name: 'Gaming Gear', image: 'https://picsum.photos/300/300?cat=12', total: 19 },
  { id: 13, name: 'Furniture', image: 'https://picsum.photos/300/300?cat=13', total: 45 },
  { id: 14, name: 'Kitchen Appliances', image: 'https://picsum.photos/300/300?cat=14', total: 33 },
  { id: 15, name: 'Baby & Kids', image: 'https://picsum.photos/300/300?cat=15', total: 58 },
];

const ShopByCategories = () => {
  return (
    <div>
      <SectionCard title="Shop By Categories">
        <CommonSwiper
          items={mockCategories}
          slidesPerView={7} // Giữ nguyên theo ý bạn
          spaceBetween={10}
          renderItem={(item) => (
            <div className="flex justify-center" key={item.id}>
              {/* Giữ nguyên cấu trúc HTML và Class */}
              <div className="group flex flex-col gap-2 items-center justify-between w-[180px] h-[210px] border border-gray-200 rounded-lg p-2 cursor-pointer transition-shadow hover:shadow-lg">
                {/* IMAGE */}
                <div className="h-3/4 w-full flex items-center justify-center overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>

                {/* INFO */}
                <div className="h-1/4 flex flex-col items-center justify-center gap-1 text-sm">
                  <p className="font-medium transition-colors duration-300 group-hover:text-red-500">
                    {/* Note: Tôi đổi text-text-hover thành text-red-500 vì sợ bạn chưa config theme, nếu bạn đã config thì đổi lại nhé */}
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">({item.total} item)</p>
                </div>
              </div>
            </div>
          )}
        />
      </SectionCard>
    </div>
  );
};

export default ShopByCategories;
