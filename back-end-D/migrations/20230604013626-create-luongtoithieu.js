'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LuongToiThieu', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SoQD:{
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      TenQD:{
        type: Sequelize.STRING,
        allowNull: false
      },
      VungIThang:{
        type: Sequelize.STRING(30)
      },
      VungIIThang:{
        type: Sequelize.STRING(30)
      },
      VungIIIThang:{
        type: Sequelize.STRING(30)
      },
      VungIVThang:{
        type: Sequelize.STRING(30)
      },
      VungIGio:{
        type: Sequelize.STRING(30)
      },
      VungIIGio:{
        type: Sequelize.STRING(30)
      },
      VungIIIGio:{
        type: Sequelize.STRING(30)
      },
      VungIVGio:{
        type: Sequelize.STRING(30)
      },
      TenFile:{
        type: Sequelize.STRING
      },
      NoiDungLQ:{
        type:Sequelize.TEXT
      },
      TrangThai:{
        type: Sequelize.STRING(30),
        defaultValue:'Đang sử dụng'
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
    await queryInterface.dropTable('LuongToiThieu');
  }
};