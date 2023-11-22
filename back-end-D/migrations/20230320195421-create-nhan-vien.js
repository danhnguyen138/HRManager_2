'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NhanVien', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaSoThue:{
        type: Sequelize.STRING(30),
        unique:true,
      },
      isBacLuong:{
        type: Sequelize.BOOLEAN,
        defaultValue:'0'
      },
      LuongChinh:{
        type: Sequelize.STRING,
      },
      idBacLuong:{
        type: Sequelize.STRING(30)
      },
      LoaiNV:{
        type: Sequelize.STRING(30)
      },
      HoTen: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      NgaySinh:{
        type: Sequelize.DataTypes.STRING,
        allowNull:false
      },
      Email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      Password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      GioiTinh: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      HonNhan:{
        type:Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      DanToc:{
        type:Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      QuocTich:{
        type:Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      TonGiao:{
        type:Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      SoDT: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false
      },
      QueQuan:{
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false
      },
      NoiO:{
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false
      },
      HoKhau:{
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false
      },
      CCCD: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false
      },
      NgayCap:{
        type: Sequelize.DATEONLY,
        allowNull: false
      }, 
      NoiCap: {
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false
      },
      TinhTrang: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: "Đang Làm Việc"
      },
      HinhAnh: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: "public/assets/avatar.jpg"
      },
      isAdmin: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: "0"
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
    await queryInterface.dropTable('NhanVien');
  }
};