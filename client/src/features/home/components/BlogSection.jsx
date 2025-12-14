import React from 'react';
import SectionCard from '@/components/product/SectionCard';
import { Card, Button } from 'antd';
import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockBlogs = [
  {
    id: 1,
    title: 'Top 10 xu hướng giày thể thao năm 2025',
    image: 'https://picsum.photos/400/250?random=10',
    date: '10 Oct, 2025',
    author: 'Admin',
    desc: 'Khám phá những mẫu giày đang làm mưa làm gió trên thị trường...',
  },
  {
    id: 2,
    title: 'Cách vệ sinh giày Sneaker đúng chuẩn tại nhà',
    image: 'https://picsum.photos/400/250?random=11',
    date: '05 Oct, 2025',
    author: 'Support',
    desc: 'Hướng dẫn chi tiết các bước giặt giày để giữ màu và form tốt nhất...',
  },
  {
    id: 3,
    title: 'Phân biệt giày Nike Real và Fake cực dễ',
    image: 'https://picsum.photos/400/250?random=12',
    date: '01 Oct, 2025',
    author: 'Admin',
    desc: 'Những mẹo nhỏ giúp bạn tránh mua phải hàng giả kém chất lượng...',
  },
];

const BlogSection = () => {
  return (
    // Tái sử dụng SectionCard nhưng hack một chút để ẩn nút prev/next nếu không cần
    // Hoặc bọc trong div thường nếu không muốn dùng Slider
    <div className="w-full mt-16">
      <div className="max-w-[1400px] mx-auto px-6 bg-white shadow p-6 rounded">
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
          <div className="relative">
            <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
              Latest News
            </h2>
            <span className="absolute left-0 -bottom-2.5 w-16 h-1 bg-red-600 rounded-full" />
          </div>
          <a
            href="#"
            className="text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors"
          >
            VIEW ALL
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockBlogs.map((blog) => (
            <Card
              key={blog.id}
              hoverable
              className="border-gray-200 overflow-hidden group"
              cover={
                <div className="h-[200px] overflow-hidden">
                  <img
                    alt={blog.title}
                    src={blog.image}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              }
              bodyStyle={{ padding: '20px' }}
            >
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-red-500" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={14} className="text-red-500" />
                  <span>{blog.author}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                {blog.title}
              </h3>

              <p className="text-gray-500 text-sm line-clamp-3 mb-4">{blog.desc}</p>

              <Link  className="p-0 text-red-600 font-bold hover:text-black underline">
                READ MORE
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
