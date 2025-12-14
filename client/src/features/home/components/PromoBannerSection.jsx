import React from 'react';

const banners = [
  {
    img: 'https://shopstic-codezeel.myshopify.com/cdn/shop/files/sub-banner-1.jpg?v=1682659836',
    title: 'Buy Comfortable Wooden Chair',
  },
  {
    img: 'https://shopstic-codezeel.myshopify.com/cdn/shop/files/sub-banner-2.jpg?v=1682659836',
    title: 'Biggest Deals On Clothes',
  },
  {
    img: 'https://shopstic-codezeel.myshopify.com/cdn/shop/files/sub-banner-3.jpg?v=1682659836',
    title: 'Best Quality Controller',
  },
];

const PromoBannerSection = () => {
  return (
    <div className="w-full mt-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-3 gap-6">
          {banners.map((item, index) => (
            <div
              key={index}
              className="h-[250px] overflow-hidden group relative rounded-lg shadow-sm cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black/20 group-hover:bg-black/10 transition-colors"></div>

              <div className="absolute top-1/2 left-6 -translate-y-1/2 text-white z-10 w-2/3">
                <p className="text-xl font-bold leading-snug mb-2 drop-shadow-md">{item.title}</p>
                <p className="text-lg font-medium text-yellow-300 mb-4">120.000đ</p>
                <a
                  href="#"
                  className="text-sm font-bold underline hover:text-red-400 transition-colors"
                >
                  SHOP NOW
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoBannerSection;
