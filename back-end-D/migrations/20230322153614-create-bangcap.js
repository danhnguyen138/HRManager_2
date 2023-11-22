'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BangCap', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaBC:{
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
      },
      SoQD: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
      },
      TenBC: {
        type: Sequelize.STRING(50),
        allowNull:false
      },
      LoaiBC:{
        type: Sequelize.STRING(50),
        allowNull:false
      },
      ChuyenNganh:{
        type: Sequelize.STRING(50),
        allowNull: false
      },
      HinhThuc:{
        type: Sequelize.STRING(50)
      },
      XepLoai:{
        type: Sequelize.STRING(30),
        allowNull: false
      },
      DiemSo:{
        type: Sequelize.STRING(10),
        allowNull: false
      }, 
      NgayKy:{
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      HieuLuc:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      ToChuc:{
        type: Sequelize.STRING(50),
        allowNull: false
      },
      DiaChi:{
        type: Sequelize.STRING(100),
        allowNull: false
      },
      GhiChu:{
        type: Sequelize.STRING,
      },
      TrangThai:{
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue:"Còn hiệu lực"
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
    await queryInterface.dropTable('BangCap');
  }
};