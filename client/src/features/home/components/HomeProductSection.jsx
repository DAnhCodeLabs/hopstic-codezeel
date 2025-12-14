import React from 'react';
import CommonSwiper from '@/components/common/CommonSwiper';
import ProductItem from '@/components/product/ProductItem';
import SectionCard from '@/components/product/SectionCard';

// Nhận title và data động từ bên ngoài
const HomeProductSection = ({ title, products }) => {
  return (
    <SectionCard title={title}>
      <CommonSwiper
        items={products}
        slidesPerView={6}
        spaceBetween={10}
        renderItem={(product) => (
          <div className="flex justify-center">
            <ProductItem product={product} />
          </div>
        )}
      />
    </SectionCard>
  );
};

export default HomeProductSection;
