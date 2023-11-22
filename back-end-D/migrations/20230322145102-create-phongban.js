'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PhongBan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaPB:{
        type:Sequelize.STRING(30),
        unique: true,
        allowNull:false
      },
      TenPB: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      SoLuong:{
        type: Sequelize.STRING(30),
        allowNull: false
      },
      SiSo:{
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 0
      },
      SoDienThoai:{
        type:Sequelize.STRING(30),
        allowNull:false
      },
      DiaChi: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      MoTa: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      NgayThanhLap:{
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      NguoiDaiDien:{
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      TrangThai:{
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue:"Đang hoạt động"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PhongBan');
  }
};