'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KhenThuongCaNhan', {
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
      MaKT:{
        type: Sequelize.STRING(30),
        allowNull:false
      },
      SoQD:{
        type: Sequelize.STRING(30)
      },
      NgayQD:{
        type:Sequelize.DATEONLY,
        allowNull: false
      },
      CanCu:{
        type:Sequelize.TEXT
      },
      LyDo:{
        type:Sequelize.TEXT,
      },
      HinhThuc:{
        type: Sequelize.TEXT
      },
      Thang:{
        type: Sequelize.INTEGER
      },
      TienThuong:{
        type: Sequelize.STRING(40)
      },
      NguoiBanHanh:{
        type: Sequelize.STRING(80)
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
    await queryInterface.dropTable('KhenThuongCaNhan');
  }
};