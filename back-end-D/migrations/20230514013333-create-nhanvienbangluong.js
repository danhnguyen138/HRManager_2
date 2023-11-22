'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NhanVienBangLuong', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idNhanVien: {
        type: Sequelize.INTEGER,
        references: {
          model: 'NhanVien',
          key: 'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      idBangLuong: {
        type: Sequelize.INTEGER,
        references: {
          model: 'BangLuong',
          key: 'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      HinhThuc:{
        type:Sequelize.STRING(40)
      },
      NgachLuong:{
        type:Sequelize.STRING(40)
      },
      BacLuong:{
        type:Sequelize.STRING(40)
      },
      MucLuong:{
        type: Sequelize.STRING(100)
      },
      KhenThuong:{
        type: Sequelize.STRING(100)
      },
      TongGioLam:{
        type:Sequelize.STRING(50),
      
      },
      TongNgayLam:{
        type:Sequelize.STRING(50),
       
      },
      TienSauTinhCong:{
        type: Sequelize.STRING(50)
      },
      BHXHNV:{
        type:Sequelize.STRING(50),
      },
      BHYTNV:{
        type:Sequelize.STRING(50),
      },
      TongBHNV:{
        type:Sequelize.STRING(50),
      },
      BHXHDN:{
        type:Sequelize.STRING(50),
      },
      BHYTDN:{
        type:Sequelize.STRING(50),
      },
      TongBHXH:{
        type:Sequelize.STRING(50)
      },
      TienSauTruBH:{
        type: Sequelize.STRING(50)
      },
      SoNguoiPhuThuoc:{
        type:Sequelize.STRING(50)
      },
      TienSauGiamTru:{
        type: Sequelize.STRING(50)
      },
      TienDongThue:{
        type: Sequelize.STRING(50)
      },
      ThucLanh:{
        type:Sequelize.STRING(50),
      },
      GhiChu:{
        type:Sequelize.TEXT,
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
    await queryInterface.dropTable('NhanVienBangLuong');
  }
};