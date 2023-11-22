'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ThongSoLuong', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BHXHNV: {
        type: Sequelize.FLOAT
      },
      BHYTNV: {
        type: Sequelize.FLOAT
      },
      BHYTDN: {
        type: Sequelize.FLOAT
      },
      BHXHDN: {
        type: Sequelize.FLOAT
      },
      DinhMuc: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('ThongSoLuong');
  }
};