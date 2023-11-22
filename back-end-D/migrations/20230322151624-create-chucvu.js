'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChucVu', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaChucVu: {
        type: Sequelize.STRING(10),
        unique: true,
        allowNull: false
      },
      TenChucVu: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false
      },
      MoTa: {
        type: Sequelize.TEXT
      },
      NhiemVu: {
        type: Sequelize.STRING
      },
      NguoiTao:{
        type: Sequelize.STRING(50)
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
    await queryInterface.dropTable('ChucVu');
  }
};