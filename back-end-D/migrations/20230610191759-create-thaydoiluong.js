'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ThayDoiLuong', {
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
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      HinhThucCu:{
        type: Sequelize.STRING(100)
      },
      NgachLuongCu:{
        type: Sequelize.STRING(100)
      },
      BacLuongCu:{
        type: Sequelize.STRING(100)
      },
      TienLuongCu:{
        type: Sequelize.STRING(100)
      },
      HinhThucMoi:{
        type: Sequelize.STRING(100)
      },
      NgachLuongMoi:{
        type: Sequelize.STRING(100)
      },
      BacLuongMoi:{
        type: Sequelize.STRING(100)
      },
      TienLuongMoi:{
        type: Sequelize.STRING(100)
      },
      LyDo:{
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('ThayDoiLuong');
  }
};