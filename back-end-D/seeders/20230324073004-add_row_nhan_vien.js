'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('ChucVu', [{
    //  MaChucVu: 'CV23148921321',
    //  TenChucVu:'Nhân Viên',
    //  NhiemVu:'Có chức năng tạo năng suất cho công ty',
    //  MoTa:'',
    //  NguoiTao:'Nguyễn Văn An'
    // },]
    // )
    // await queryInterface.bulkInsert('PhongBan', [{
    //   MaPB: 'MPB323542415',
    //   TenPB:'Phòng nhân sự',
    //   SoLuong:'20',
    //   SiSo: 0,
    //   SoDienThoai:'0745634124',
    //   DiaChi:'Hồ Chí Minh',
    //   MoTa:'',
    //   NguoiDaiDien:'Nguyễn Văn An'
    //  },]
    //  )
    await queryInterface.bulkInsert('NhanVien', [{
      HoTen: 'Nguyễn Văn An',
      Email: 'admin@gmail.com',
      NgaySinh: new Date('2002-10-03'),
      Password: '$2b$10$6QlHva425LZhTDGdPjuKd.TQ4a1LsC3iG40p9mFEOK5itMIMrkyW6',
      GioiTinh: 'Nam',
      HonNhan :'Độc thân',
      DanToc:'Kinh',
      QuocTich:'Việt Nam',
      TonGiao:'Không',
      SoDT: "0906345123",
      QueQuan:'Phường 14, Quận 7, Thành phố Hồ Chí Minh',
      NoiO:'Phường 14, Quận 7, Thành phố Hồ Chí Minh',
      HoKhau:'Phường 14, Quận 7, Thành phố Hồ Chí Minh',
      CCCD: "203123231341",
      NgayCap: new Date('2021-04-23'),
      NoiCap:'Thành phố Hồ Chí Minh',
      HinhAnh:'public/assets/avatar.jpg',
      // idPhongBan:1,
      // idChucVu:1,
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },]
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // queryInterface.bulkDelete('ChucVu', null, {});
     queryInterface.bulkDelete('NhanVien', null, {});
    
  }
};
