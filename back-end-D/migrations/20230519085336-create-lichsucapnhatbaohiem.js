'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LichSuCapNhatBaoHiem', {
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
      TruongTD:{
        type: Sequelize.STRING(40)
      },
      NoiDungCu:{
        type: Sequelize.STRING(100)
      },
      NoiDungMoi:{
        type: Sequelize.STRING(100)
      },
      LyDo:{
        type: Sequelize.STRING(100)
      },
      idThayDoi:{
        type: Sequelize.INTEGER,
        references: {
          model: 'NhanVien',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('LichSuCapNhatBaoHiem');
  }
};