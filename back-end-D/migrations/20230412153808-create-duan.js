'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DuAn', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },     
      TenDuAn:{
        type: Sequelize.STRING(250),
        allowNull:false
      },
      NgayBatDau: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      NgayKetThuc: {
        type: Sequelize.DATEONLY,
      },      
      idNhanVien: {
        type: Sequelize.JSON,
        references: {
          model: 'NhanVien',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      PhongBan:{
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
    await queryInterface.dropTable('DuAn');
  }
};