'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NhanVienThongBao', {
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
      idThongBao: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ThongBao',
          key: 'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      TrangThai:{
        type: Sequelize.STRING(50),
        defaultValue:'Chưa xem'
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
    await queryInterface.dropTable('NhanVienThongBao');
  }
};