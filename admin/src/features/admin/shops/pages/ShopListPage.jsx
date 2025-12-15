import React, { useState } from 'react';
import { useTable } from '@/components/common/Table/useTable';
import { useShops } from '../../hooks/useAdminShops';
import ShopListTable from '../components/hopListTable';
import ShopListFilter from '../components/ShopListFilter';
import ShopDetailDrawer from '../components/ShopDetailDrawer';

const ShopListPage = () => {
  // 1. Hook quản lý state bảng (page, limit, search...)
  const { params, setParams, onSearch, handleTableChange } = useTable();

  // 2. Hook lấy dữ liệu từ API
  const { data, isLoading } = useShops(params);

  // 3. State quản lý Drawer (Lưu ID shop đang xem)
  const [viewShopId, setViewShopId] = useState(null);

  // Hàm mở drawer
  const handleViewDetail = (record) => {
    setViewShopId(record.id);
  };

  // Hàm đóng drawer
  const handleCloseDrawer = () => {
    setViewShopId(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Bộ lọc */}
      <ShopListFilter onSearch={onSearch} setParams={setParams} />

      {/* Bảng danh sách */}
      <ShopListTable
        dataSource={data?.shops || []}
        loading={isLoading}
        total={data?.total || 0}
        params={params}
        onChange={handleTableChange}
        onViewDetail={handleViewDetail} // Truyền hàm mở drawer xuống bảng
      />

      {/* Drawer chi tiết & Duyệt */}
      <ShopDetailDrawer open={!!viewShopId} shopId={viewShopId} onClose={handleCloseDrawer} />
    </div>
  );
};

export default ShopListPage;
