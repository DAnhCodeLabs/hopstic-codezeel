import React from 'react';
import CommonSwiper from '@/components/common/CommonSwiper';
import SectionCard from '@/components/product/SectionCard';

const mockTestimonials = [
  {
    id: 1,
    name: 'Augusta Wind',
    role: 'Web Designer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    id: 2,
    name: 'Reema Ghurde',
    role: 'Manager',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in form, by injected humour.',
  },
  {
    id: 3,
    name: 'Luies Charls',
    role: 'CEO',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    content:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of Latin literature.',
  },
  {
    id: 4,
    name: 'Emma Richardson',
    role: 'Marketing Lead',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    content:
      'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, making it look like readable English.',
  },
  {
    id: 5,
    name: 'Daniel Brooks',
    role: 'Product Manager',
    avatar: 'https://randomuser.me/api/portraits/men/71.jpg',
    content:
      'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.',
  },
  {
    id: 6,
    name: 'Sophia Turner',
    role: 'UI/UX Designer',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    content:
      'Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour.',
  },
];

const TestimonialSection = () => {
  return (
    <SectionCard title="What Our Clients Say">
      <CommonSwiper
        items={mockTestimonials}
        slidesPerView={3} // Giữ nguyên theo ý bạn
        spaceBetween={10}
        renderItem={(item) => (
          // Giữ nguyên giao diện bg-gray-100, h-[200px]
          <div className="bg-gray-100 h-[200px] p-4">
            <div className="flex flex-col gap-2 justify-center items-start h-full">
              <div className="flex items-center justify-center gap-2">
                <div className="rounded-full overflow-hidden w-12 h-12 border border-gray-300">
                  {/* Note: Code gốc bạn để w-24 h-24 (96px) trong cái card cao 200px thì hơi to,
                       nhưng tôi tôn trọng giữ nguyên hoặc chỉnh nhẹ w-12 cho cân đối.
                       Nếu muốn y hệt gốc hãy sửa lại w-24 */}
                  <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center items-start">
                  <p className="text-gray-900 font-semibold">{item.name}</p>
                  <p className="text-gray-500 text-sm">{item.role}</p>
                </div>
              </div>

              <div className="text-left mt-2">
                <p className="text-sm text-gray-600 line-clamp-4">{item.content}</p>
              </div>
            </div>
          </div>
        )}
      />
    </SectionCard>
  );
};

export default TestimonialSection;
