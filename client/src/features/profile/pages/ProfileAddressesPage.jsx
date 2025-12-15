import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Tag, Button, Divider, Popconfirm, Spin, Empty } from 'antd';
import ButtonCommon from '@/components/common/ButtonCommon';
import AddressFormModal from '../components/AddressFormModal';
import { useAddress } from '../hooks/useAddress';

const ProfileAddressesPage = () => {
  const { addresses, isLoading, deleteAddress, updateAddress } = useAddress();

  // State quản lý Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Xử lý mở modal Thêm mới
  const handleCreate = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  // Xử lý mở modal Sửa
  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  // Xử lý Set Mặc định
  const handleSetDefault = async (id) => {
    await updateAddress({ id, data: { is_default: true } });
  };

  return (
    <div className="flex flex-col min-h-[400px]">
      {/* 1. Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 text-right">
          <ButtonCommon icon={<Plus size={18} />} onClick={handleCreate}>
            Thêm địa chỉ mới
          </ButtonCommon>
        </div>
      </div>

      <Divider className="mt-0 mb-6" />

      {/* 2. Loading & Empty State */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spin size="default" />
        </div>
      ) : addresses.length === 0 ? (
        <Empty description="Bạn chưa lưu địa chỉ nào" />
      ) : (
        /* 3. Danh sách địa chỉ thật */
        <div className="flex flex-col gap-6">
          {addresses.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-gray-100 last:border-0"
            >
              {/* Info */}
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900 border-r border-gray-300 pr-2">
                    {item.contact_name}
                  </span>
                  <span className="text-gray-500">{item.contact_phone}</span>
                </div>

                <div className="text-gray-600 text-sm">
                  <p className="mb-1">{item.address_detail}</p>
                  <p>
                    {item.ward}, {item.district}, {item.province}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  {item.is_default && (
                    <Tag color="#ee4d2d" className="m-0">
                      Mặc định
                    </Tag>
                  )}
                  <Tag className="m-0 bg-gray-100 text-gray-500 border-gray-200">
                    {item.type === 'home' ? 'Nhà riêng' : 'Văn phòng'}
                  </Tag>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end gap-3 min-w-[120px]">
                <div className="flex items-center gap-2 text-sm">
                  <button
                    className="text-blue-600 hover:underline font-medium cursor-pointer"
                    onClick={() => handleEdit(item)}
                  >
                    Cập nhật
                  </button>

                  {/* Không cho xóa địa chỉ mặc định */}
                  {!item.is_default && (
                    <>
                      <span className="text-gray-300">|</span>
                      <Popconfirm
                        title="Xóa địa chỉ?"
                        description="Bạn có chắc muốn xóa địa chỉ này không?"
                        onConfirm={() => deleteAddress(item.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                      >
                        <button className="text-red-500 hover:underline cursor-pointer">Xóa</button>
                      </Popconfirm>
                    </>
                  )}
                </div>

                <Button
                  disabled={item.is_default}
                  onClick={() => handleSetDefault(item.id)}
                  size="small"
                  className={`text-xs ${
                    item.is_default
                      ? 'text-gray-400 border-gray-200'
                      : 'text-gray-600 border-gray-300 hover:border-orange-500 hover:text-orange-500'
                  }`}
                >
                  Thiết lập mặc định
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Modal */}
      <AddressFormModal
        title={editingAddress ? 'Cập nhật địa chỉ' : 'Địa chỉ mới'}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingAddress}
      />
    </div>
  );
};

export default ProfileAddressesPage;
