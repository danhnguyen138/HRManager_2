'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NguoiPhuThuoc', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idNhanVien: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ChucVu',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      HoTen: {
        type: Sequelize.STRING
      },
      QuanHe: {
        type: Sequelize.STRING
      },
      SoDT: {
        type: Sequelize.STRING
      },
      NgaySinh: {
        type: Sequelize.STRING
      },
      DiaChi: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('NguoiPhuThuoc');
  }
};