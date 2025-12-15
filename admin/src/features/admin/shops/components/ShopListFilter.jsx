import React from 'react';
import { Card, Typography } from 'antd';
import { Search } from 'lucide-react';
import FormGrid from '@/components/common/Form/FormGrid';
import InputCommon from '@/components/common/Input/InputCommon';
import SelectCommon from '@/components/common/Input/SelectCommon';

const { Title } = Typography;

const ShopListFilter = ({ onSearch, setParams }) => {
  return (
    <Card bordered={false} className="shadow-sm rounded-lg">
      <div className="flex flex-col gap-4">
        <Title level={4} style={{ margin: 0 }}>
          Quản lý Cửa hàng
        </Title>

        <FormGrid cols={4} gap={4}>
          {/* 1. Tìm kiếm tên Shop */}
          <div className="col-span-2">
            <InputCommon
              placeholder="Tìm theo tên cửa hàng..."
              prefix={<Search size={18} className="text-gray-400" />}
              onChange={(e) => onSearch(e.target.value)}
              allowClear
            />
          </div>

          {/* 2. Lọc trạng thái (Quan trọng) */}
          <div className="col-span-1">
            <SelectCommon
              placeholder="Trạng thái"
              defaultValue="all" // Mặc định chọn tất cả
              options={[
                { label: 'Tất cả trạng thái', value: 'all' },
                { label: 'Chờ duyệt (Mới)', value: 'pending' }, // Admin cần check cái này nhất
                { label: 'Đang hoạt động', value: 'active' },
                { label: 'Đã bị khóa', value: 'banned' },
                { label: 'Tạm nghỉ', value: 'inactive' },
              ]}
              onChange={(val) =>
                setParams((prev) => ({ ...prev, filters: { ...prev.filters, status: val } }))
              }
            />
          </div>

          {/* Có thể thêm lọc theo Tỉnh/Thành nếu cần sau này */}
        </FormGrid>
      </div>
    </Card>
  );
};

export default ShopListFilter;