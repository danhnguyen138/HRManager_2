'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CongTy', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaDonVi:{
        type: Sequelize.STRING(50),
        allowNull: false
      },
      TenDonVi:{
        type:Sequelize.STRING(100),
        allowNull: false
      },
      DiaChi:{
        type:Sequelize.STRING(),
        allowNull: false
      },
      DienThoai:{
        type:Sequelize.STRING(20),
        allowNull: false
      },
      Fax:{
        type:Sequelize.STRING(20),
        allowNull: false
      },
      Website:{
        type:Sequelize.STRING(100),
        allowNull: false
      },
      Email:{
        type:Sequelize.STRING(50),
        allowNull: false
      },
      LinhVuc:{
        type:Sequelize.STRING(50),
        allowNull: false
      },
      MaSoThue:{
        type:Sequelize.STRING(30),
        allowNull: false
      },
      NganHang:{
        type:Sequelize.STRING(50),
        allowNull: false
      },
      SoTK:{
        type: Sequelize.STRING(30),
        allowNull: false
      },
      DiaBan:{
        type: Sequelize.STRING(30),
        allowNull:false
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
    await queryInterface.dropTable('CongTy');
  }
};