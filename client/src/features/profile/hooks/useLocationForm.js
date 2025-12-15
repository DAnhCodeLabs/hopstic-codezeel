import { useState, useEffect } from 'react';
import { locationService } from '@/services/locationService';

export const useLocationForm = (setValue, initialData) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // State lưu ID tạm thời để load danh sách con (Vì DB lưu Tên, không lưu ID)
  const [selectedProvId, setSelectedProvId] = useState(null);
  const [selectedDistId, setSelectedDistId] = useState(null);

  // 1. Load Tỉnh khi Mount
  useEffect(() => {
    locationService.getProvinces().then((data) => {
      setProvinces(data.map((p) => ({ label: p.full_name, value: p.id })));
    });
  }, []);

  // 2. Xử lý khi chọn Tỉnh
  const handleProvinceChange = async (provId, option) => {
    // Lưu tên Tỉnh vào Form (Backend cần Tên)
    setValue('province', option.label);

    // Reset Huyện/Xã
    setValue('district', null);
    setValue('ward', null);
    setDistricts([]);
    setWards([]);

    // Load Huyện mới
    setSelectedProvId(provId);
    const data = await locationService.getDistricts(provId);
    setDistricts(data.map((d) => ({ label: d.full_name, value: d.id })));
  };

  // 3. Xử lý khi chọn Huyện
  const handleDistrictChange = async (distId, option) => {
    setValue('district', option.label);

    // Reset Xã
    setValue('ward', null);
    setWards([]);

    // Load Xã mới
    setSelectedDistId(distId);
    const data = await locationService.getWards(distId);
    setWards(data.map((w) => ({ label: w.full_name, value: w.id })));
  };

  // 4. Xử lý khi chọn Xã
  const handleWardChange = (wardId, option) => {
    setValue('ward', option.label);
  };

  return {
    provinces,
    districts,
    wards,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
  };
};
