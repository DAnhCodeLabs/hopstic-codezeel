import { AuthFailureError } from "../../core/error.response.js";
import { createTokenPair } from "../../auth/authUtils.js";

class AdminService {
  static login = async ({ email, password }) => {
    // 1. Lấy thông tin mật từ .env
    const rootEmail = process.env.SYS_ADMIN_EMAIL;
    const rootPassword = process.env.SYS_ADMIN_PASSWORD;

    // 2. So sánh trực tiếp (Hard compare)
    if (
      !rootEmail ||
      !rootPassword ||
      email !== rootEmail ||
      password !== rootPassword
    ) {
      throw new AuthFailureError(
        "Admin Authentication Failed: Sai thông tin Root!"
      );
    }

    // 3. Tạo Token quyền lực nhất (Role '0000')
    // userId là 'root-admin' để middleware checkAuth nhận diện
    const payload = {
      userId: "root-admin",
      email: rootEmail,
      roles: ["ADMIN"],
    };

    const tokens = await createTokenPair(
      payload,
      process.env.JWT_ACCESS_SECRET,
      process.env.JWT_REFRESH_SECRET
    );

    return {
      user: {
        id: "root-admin",
        name: "System Root Administrator",
        email: rootEmail,
        roles: ["ADMIN"],
      },
      tokens,
    };
  };
}

export default AdminService;
