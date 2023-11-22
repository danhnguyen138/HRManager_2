'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TongHopNgayCong', {
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
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      Thang: {
        type: Sequelize.STRING(30)
      },
      NgayLamViec:{
        type: Sequelize.STRING(100)
      },
      TongGio:{
        type: Sequelize.STRING(30)
      },
      DiTre:{
        type: Sequelize.STRING(30)
      },
      VeSom:{
        type: Sequelize.STRING(30)
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
    await queryInterface.dropTable('TongHopNgayCong');
  }
};