'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HopDong', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idDaiDien: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      HoTenA:{
        type: Sequelize.STRING(100)
      },
      ChucVuA:{
        type: Sequelize.STRING(100)
      },
      DaiDienA:{
        type: Sequelize.STRING(100)
      },
      DiaChiA:{
        type: Sequelize.STRING(100)
      },
      SoDTA:{
        type: Sequelize.STRING(100)
      },
      ThoiGianLV:{
        type: Sequelize.STRING(100)
      },
      HoTenB:{
        type: Sequelize.STRING(100)
      },
      CCCDB:{
        type: Sequelize.STRING(100)
      },
      NgayCapB:{
        type: Sequelize.STRING(100)
      },
      TaiB:{
        type: Sequelize.STRING(100)
      },
      DiaChiLV:{
        type: Sequelize.STRING
      },
      
      MaHD:{
        type: Sequelize.STRING(100)
      },
      
      TenHD:{
        type: Sequelize.STRING(100)
      },     
      LoaiHD:{
        type: Sequelize.STRING(100)
      },
      ThoiHan:{
        type: Sequelize.STRING(100)
      },
      LuongChinh:{
        type: Sequelize.STRING(100)
      },
      LuongChinhThucTap:{
        type: Sequelize.STRING(100)
      },
      LuongChinhThuViec:{
        type: Sequelize.STRING(100)
      },
      NgachLuong:{
        type: Sequelize.STRING(100)
      },
      BacLuong:{
        type: Sequelize.STRING(100)
      },
      GhiChu:{
        type: Sequelize.TEXT
      },
      HetHan:{
        type: Sequelize.STRING
      },
      HinhThucTra:{
        type: Sequelize.STRING
      },
      idNhanVien:{
        type: Sequelize.INTEGER,
        references: {
          model: 'NhanVien',
          key: 'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'
      },
      TrangThai:{
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue:'Còn hiệu lực'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('HopDong');
  }
};
