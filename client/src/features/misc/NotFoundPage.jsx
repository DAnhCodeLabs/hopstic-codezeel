import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Xin lỗi, trang bạn tìm kiếm không tồn tại."
    extra={
      <Link to="/">
        <Button type="primary">Về trang chủ</Button>
      </Link>
    }
    className="flex flex-col justify-center"
  />
);

export default NotFoundPage;
