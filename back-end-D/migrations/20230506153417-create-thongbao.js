'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ThongBao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TieuDe:{
        type: Sequelize.STRING(50),
        allowNull:false
      },
      NoiDung:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      TrangThai:{
        type: Sequelize.STRING(80),
        allowNull: false,
        defaultValue:'Chưa gửi'
      },
      ThoiGianGui:{
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('ThongBao');
  }
};