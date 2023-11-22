'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChamCong', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idNhanVien:{
        type: Sequelize.INTEGER,
        references: {
          model: 'NhanVien',
          key: 'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      Ngay:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      GioVao:{
        type: Sequelize.TIME,
      },
      GioRa:{
        type: Sequelize.TIME,
      },
      TongGio:{
        type: Sequelize.STRING(20),
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
    await queryInterface.dropTable('ChamCong');
  }
};