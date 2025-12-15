import React, { useEffect } from 'react';
import { Modal, Radio, Checkbox, Select, Form } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import ButtonCommon from '@/components/common/ButtonCommon';
import RHFInput from '@/components/form/RHFInput';
import InputCommon from '@/components/common/InputCommon'; // Import thêm InputCommon để dùng trực tiếp
import { useAddress } from '../hooks/useAddress';
import { useLocationForm } from '../hooks/useLocationForm';

const AddressFormModal = ({ open, onClose, initialData, title }) => {
  const { createAddress, updateAddress, isSubmitting } = useAddress();

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      contact_name: '',
      contact_phone: '',
      province: null,
      district: null,
      ward: null,
      address_detail: '',
      type: 'home',
      is_default: false,
    },
  });

  const {
    provinces,
    districts,
    wards,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
  } = useLocationForm(setValue, initialData);

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({
          contact_name: '',
          contact_phone: '', // Luôn khởi tạo với đầu số chuẩn
          province: null,
          district: null,
          ward: null,
          address_detail: '',
          type: 'home',
          is_default: false,
        });
      }
    }
  }, [open, initialData, reset]);

  const onSubmit = async (data) => {
    try {
      if (initialData?.id) {
        await updateAddress({ id: initialData.id, data });
      } else {
        await createAddress(data);
      }
      onClose();
    } catch (error) {}
  };

  return (
    <Modal
      title={<span className="text-lg font-bold">{title}</span>}
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      className="top-10"
      destroyOnClose
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-4">
        {/* Hàng 1: Tên & SĐT */}
        <div className="grid grid-cols-2 gap-4">
          <RHFInput
            name="contact_name"
            control={control}
            placeholder="Họ và tên"
            rules={{ required: 'Vui lòng nhập tên' }}
          />

          {/* --- SỬA ĐỔI QUAN TRỌNG TẠI ĐÂY --- */}
          <Controller
            name="contact_phone"
            control={control}
            rules={{
              required: 'Vui lòng nhập số điện thoại',
              validate: (value) => {
                const phone = value?.trim();
                const vnPhoneRegex = /^(0[3|5|7|8|9][0-9]{8}|\+84[3|5|7|8|9][0-9]{8})$/;

                if (!vnPhoneRegex.test(phone)) {
                  return 'SĐT không hợp lệ (VD: 0912345678 hoặc +84912345678)';
                }
                return true;
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                validateStatus={error ? 'error' : ''}
                help={error?.message}
                className="mb-4 font-normal"
                layout="vertical"
              >
                <InputCommon
                  {...field}
                  placeholder="Số điện thoại"
                  maxLength={13} // +84xxxxxxxxx
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9+]/g, '');
                    field.onChange(val);
                  }}
                />
              </Form.Item>
            )}
          />

          {/* ---------------------------------- */}
        </div>

        {/* Hàng 2: Chọn Địa chỉ Hành chính */}
        <div className="grid grid-cols-3 gap-4">
          <Controller
            name="province"
            control={control}
            rules={{ required: 'Chọn Tỉnh/Thành' }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                validateStatus={error ? 'error' : ''}
                help={error?.message}
                className="mb-0"
              >
                <Select
                  {...field}
                  showSearch
                  placeholder="Tỉnh/Thành"
                  options={provinces}
                  optionFilterProp="label"
                  size="large"
                  onChange={(val, opt) => handleProvinceChange(val, opt)}
                  value={field.value}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="district"
            control={control}
            rules={{ required: 'Chọn Quận/Huyện' }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                validateStatus={error ? 'error' : ''}
                help={error?.message}
                className="mb-0"
              >
                <Select
                  {...field}
                  showSearch
                  placeholder="Quận/Huyện"
                  options={districts}
                  optionFilterProp="label"
                  size="large"
                  disabled={!districts.length}
                  onChange={(val, opt) => handleDistrictChange(val, opt)}
                  value={field.value}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="ward"
            control={control}
            rules={{ required: 'Chọn Phường/Xã' }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                validateStatus={error ? 'error' : ''}
                help={error?.message}
                className="mb-0"
              >
                <Select
                  {...field}
                  showSearch
                  placeholder="Phường/Xã"
                  options={wards}
                  optionFilterProp="label"
                  size="large"
                  disabled={!wards.length}
                  onChange={(val, opt) => handleWardChange(val, opt)}
                  value={field.value}
                />
              </Form.Item>
            )}
          />
        </div>

        {/* Hàng 3: Địa chỉ cụ thể */}
        <RHFInput
          name="address_detail"
          control={control}
          placeholder="Số nhà, tên đường cụ thể..."
          rules={{ required: 'Vui lòng nhập địa chỉ cụ thể' }}
        />

        {/* Hàng 4: Loại địa chỉ */}
        <div className="flex items-center gap-4 mb-2">
          <span className="text-gray-500 font-medium">Loại địa chỉ:</span>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field}>
                <Radio value="home">Nhà riêng</Radio>
                <Radio value="office">Văn phòng</Radio>
              </Radio.Group>
            )}
          />
        </div>

        {/* Hàng 5: Mặc định */}
        {(!initialData || !initialData.is_default) && (
          <div className="flex items-center mb-4">
            <Controller
              name="is_default"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} {...field} className="text-gray-600">
                  Đặt làm địa chỉ mặc định
                </Checkbox>
              )}
            />
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
          <ButtonCommon onClick={onClose} className="bg-white! text-gray-600! border-gray-300!">
            Trở lại
          </ButtonCommon>
          <ButtonCommon htmlType="submit" loading={isSubmitting}>
            Hoàn thành
          </ButtonCommon>
        </div>
      </form>
    </Modal>
  );
};

export default AddressFormModal;
