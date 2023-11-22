import React from 'react';
import { Header } from '../../components';

 function Home() {
  return (
    <div className="bg-white border shadow-sm m-2 z mt-24 p-2 md:p-10 rounded-3xl">
      <Header title="Trang Chủ" />
      <h1>Home Page</h1>
      <div>
        Giới thiệu công ty: Phần này giới thiệu về lịch sử, thương hiệu, đội ngũ nhân viên, cơ cấu tổ chức của công ty.
      </div>
    </div>
  );
}
export default Home;
