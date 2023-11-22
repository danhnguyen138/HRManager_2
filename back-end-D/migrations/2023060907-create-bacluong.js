'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BacLuong', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idNgachLuong: {
        type: Sequelize.INTEGER,
        references: {
          model: 'NgachLuong',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      TenBacLuong: {
        type: Sequelize.STRING(100)
      },
      TienLuong: {
        type: Sequelize.STRING(100)
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
    await queryInterface.dropTable('BacLuong');
  }
};
