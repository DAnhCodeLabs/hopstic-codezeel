import React from 'react';
import { Card, Typography } from 'antd';
import { Search } from 'lucide-react';
import InputCommon from '@/components/common/Input/InputCommon';
import SelectCommon from '@/components/common/Input/SelectCommon';
import FormGrid from '@/components/common/Form/FormGrid';

const { Title } = Typography;

const UserListFilter = ({ onSearch, setParams }) => {
  return (
    <Card bordered={false} className="shadow-sm rounded-lg">
      <div className="flex flex-col gap-4">
        <Title level={4} style={{ margin: 0 }}>
          Danh sách người dùng
        </Title>

        <FormGrid cols={4} gap={4}>
          {/* 1. Tìm kiếm */}
          <div className="col-span-2">
            <InputCommon
              placeholder="Tìm theo tên hoặc email..."
              prefix={<Search size={18} className="text-gray-400" />}
              onChange={(e) => onSearch(e.target.value)}
              allowClear
            />
          </div>

          {/* 2. Lọc trạng thái */}
          <SelectCommon
            placeholder="Trạng thái"
            options={[
              { label: 'Tất cả trạng thái', value: 'all' },
              { label: 'Đang hoạt động', value: 'active' },
              { label: 'Đã bị khóa', value: 'blocked' },
            ]}
            onChange={(val) =>
              setParams((prev) => ({ ...prev, filters: { ...prev.filters, status: val } }))
            }
          />

          {/* 3. Lọc vai trò */}
          <SelectCommon
            placeholder="Vai trò"
            options={[
              { label: 'Tất cả vai trò', value: 'all' },
              { label: 'Người bán (Seller)', value: 'seller' },
              { label: 'Người mua (User)', value: 'user' },
            ]}
            onChange={(val) =>
              setParams((prev) => ({ ...prev, filters: { ...prev.filters, role: val } }))
            }
          />
        </FormGrid>
      </div>
    </Card>
  );
};

export default UserListFilter;
