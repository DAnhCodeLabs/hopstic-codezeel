import React from 'react';
import { BadgeCheck } from 'lucide-react'; // Thay icon Trademark
import { Rate } from 'antd';

const ProductItem = ({ product }) => {
  if (!product) return null;

  return (
    <div className="w-[250px] h-[350px] border border-gray-200 bg-white flex flex-col">
      <div className="h-3/5 w-full bg-gray-100 relative">
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 p-2 flex flex-col items-start justify-between">
        <div className="flex items-center justify-start gap-1 text-text-soft text-gray-500">
          <BadgeCheck size={16} /> {/* Thay icon nhưng giữ bố cục */}
          <p className="text-xs">{product.brand || 'Nike'}</p>
        </div>
        <div className="w-full">
          <h3 className="text-text-strong font-medium line-clamp-2 leading-tight text-left">
            {product.name}
          </h3>
        </div>

        <div className="flex flex-col items-start justify-end gap-1">
          <div className="font-semibold flex items-center justify-start gap-2">
            <span className="text-primary text-red-600 text-lg">
              {product.price?.toLocaleString()}đ
            </span>
            {product.originalPrice && (
              <span className="text-text-soft text-gray-400 text-sm line-through">
                {product.originalPrice.toLocaleString()}đ
              </span>
            )}
          </div>
          <div className="flex justify-start items-center">
            <Rate count={1} value={1} style={{ fontSize: '12px', color: '#fbbf24' }} disabled />
            <span className="text-sm">{'(4.5)'}</span>
            <span className="text-xs text-text-soft text-gray-500 ml-2">Đã bán {product.sold}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
