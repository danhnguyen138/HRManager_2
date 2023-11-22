'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LichSuChamCong', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TenFile: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      NgayBatDau: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      NgayKetThuc: {
        type: Sequelize.DATEONLY,
        allowNull: false
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
    await queryInterface.dropTable('LichSuChamCong');
  }
};