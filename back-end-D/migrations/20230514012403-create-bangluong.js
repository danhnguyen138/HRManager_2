'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BangLuong', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Thang:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      NgayBatDau:{
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      NgayKetThuc:{
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      NgayCongChuan:{
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('BangLuong');
  }
};