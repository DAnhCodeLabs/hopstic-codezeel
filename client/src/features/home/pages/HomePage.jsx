import React from 'react';
import Banner from '../components/Banner';
import ServiceHighlights from '../components/ServiceHighlights';
import PromoNoticeBar from '../components/PromoNoticeBar';
import HomeProductSection from '../components/HomeProductSection';
import PromoBannerSection from '../components/PromoBannerSection';
import CampaignBannerSection from '../components/CampaignBannerSection';
import BlogSection from '@/features/home/components/BlogSection';
import ShopByCategories from '@/features/home/components/ShopByCategories';
import TestimonialSection from '@/features/home/components/TestimonialSection';
import NewsletterSubscription from '../components/NewsletterSubscription';

// Giả lập data (Nên tách ra file src/config/mockData.js sau này)
const mockProducts = Array(10)
  .fill({
    id: 1,
    name: "Nike Air Force 1 '07",
    brand: 'Nike',
    image: 'https://picsum.photos/300/400',
    price: 120000,
    originalPrice: 150000,
    sold: 120,
    discount: 30,
    rating: 4.8,
  })
  .map((p, i) => ({ ...p, id: i }));

const HomePage = () => {
  return (
    <div className="bg-gray-50 pb-20 min-h-screen">
      {/* 1. Slider chính */}
      <Banner />

      {/* 2. Dịch vụ nổi bật (Free shipping...) */}
      <ServiceHighlights />

      {/* 4. Danh sách sản phẩm mới nhất */}
      <HomeProductSection title="Latest Products" products={mockProducts} />

      {/* 5. Banner quảng cáo 3 cột */}
      <PromoBannerSection />

      {/* 6. Danh sách sản phẩm nổi bật */}
      <HomeProductSection title="Featured Products" products={mockProducts} />
      <ShopByCategories />

      {/* 7. Banner quảng cáo 2 cột lớn */}
      <CampaignBannerSection />

      {/* 8. Deal of the day */}
      <HomeProductSection title="Deal Of The Day" products={mockProducts} />
      <PromoNoticeBar />

      {/* 9. Bán chạy nhất */}
      <HomeProductSection title="Best Selling Products" products={mockProducts} />
      <TestimonialSection />

      <BlogSection />

      <NewsletterSubscription />
    </div>
  );
};

export default HomePage;
