import React from 'react';

const CampaignBannerSection = () => {
  const banners = [
    {
      img: 'https://shopstic-codezeel.myshopify.com/cdn/shop/files/cms-banner-1.jpg?v=1682599632',
      title: 'New Florence Wrap Dress',
    },
    {
      img: 'https://shopstic-codezeel.myshopify.com/cdn/shop/files/cms-banner-2.jpg?v=1682665954',
      title: 'Huawei Nova Y70 Mobile',
    },
  ];

  return (
    <div className="w-full mt-18">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 gap-6">
          {banners.map((item, index) => (
            <div key={index} className="h-[250px] overflow-hidden group cursor-pointer relative">
              <img
                src={item.img}
                alt={item.title}
                // Giữ nguyên scale-120 như bạn muốn
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-125"
              />
              <div className="absolute w-1/2 flex flex-col gap-4 top-1/2 left-6 -translate-y-1/2 text-text-strong z-10">
                <p>Save Up To 20% Off</p>
                <p className="text-2xl font-semibold leading-snug">{item.title}</p>
                <a href="#" className="underline w-fit">
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

export default CampaignBannerSection;
