import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules'; // Thêm Autoplay nếu cần sau này
import 'swiper/css';
import 'swiper/css/navigation';

const CommonSwiper = ({
  items = [],
  slidesPerView = 1,
  spaceBetween = 20,
  renderItem,
  prevRef, // Nhận ref nút bấm từ cha
  nextRef, // Nhận ref nút bấm từ cha
}) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      navigation={{
        prevEl: prevRef?.current, // Gắn nút prev
        nextEl: nextRef?.current, // Gắn nút next
      }}
      // Quan trọng: Cập nhật lại navigation khi component mount xong
      onBeforeInit={(swiper) => {
        if (prevRef?.current && nextRef?.current) {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }
      }}
      className="py-2" // Thêm padding để shadow của item không bị cắt
    >
      {items.map((item, index) => (
        <SwiperSlide key={item.id || index}>{renderItem(item)}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CommonSwiper;
