import ApiKey from "../models/apikey.model.js";

const findById = async (key) => {
  // Tìm key trong DB và phải đang hoạt động (status: true)
  const objKey = await ApiKey.findOne({
    where: { key: key, status: true },
    raw: true, // Trả về object thuần cho nhẹ
  });
  return objKey;
};

export { findById };
