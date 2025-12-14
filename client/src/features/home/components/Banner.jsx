import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const bannerImages = [
  'https://down-vn.img.susercontent.com/file/sg-11134258-8224y-mhri85utbls21c@resize_w797_nl.webp',
  'https://down-vn.img.susercontent.com/file/sg-11134258-8224t-mhrig2rkmh355a@resize_w797_nl.webp',
  'https://down-vn.img.susercontent.com/file/sg-11134258-8227a-mhri87bbki6eaa@resize_w797_nl.webp',
  'https://down-vn.img.susercontent.com/file/sg-11134258-8225r-mhsep3yqeozq59@resize_w797_nl.webp',
];

const Banner = () => {
  return (
    // Giữ nguyên class bao ngoài của bạn
    <div className="max-w-[1400px] mx-auto h-[400px]">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
      >
        {bannerImages.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="h-full w-full text-center">
              <img
                src={src}
                alt="Banner"
                className="h-full w-full object-cover" // Thêm object-cover để ảnh không méo
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
