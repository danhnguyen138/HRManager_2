'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PhanCongTheoNgay', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NgayPhanCong: {
        type: Sequelize.STRING,
        allowNull: false
      },
      TenCV: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
  
      DanhGia: {
        type: Sequelize.STRING,
      },
      TienDo: {
        type: Sequelize.STRING,
      },
      KPI: {
        type: Sequelize.STRING
      },
      idPhanCong: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PhanCong',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('PhanCongTheoNgay');
  }
};