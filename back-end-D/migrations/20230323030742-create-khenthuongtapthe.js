'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KhenThuongTapThe', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaKT:{
        type: Sequelize.STRING(30),
        allowNull:false,
        unique: true
      },
      TrangThai:{
        type: Sequelize.STRING(30),
        defaultValue: 'Lên kế hoạch'
      },
      SoQD:{
        type: Sequelize.STRING(30)
      },
      NgayQD:{
        type:Sequelize.DATEONLY,
        allowNull: false
      },
      NgayKT:{
        type:Sequelize.DATEONLY,
        allowNull: false
      },
      CanCu:{
        type:Sequelize.TEXT
      },
      LyDo:{
        type:Sequelize.TEXT,
      },
      idDoiTuong:{
        type: Sequelize.INTEGER,
        references: {
          model: 'PhongBan',
          key: 'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'
      },
      HinhThuc:{
        type: Sequelize.TEXT
      },
      NguonChi:{
        type: Sequelize.STRING
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
    await queryInterface.dropTable('KhenThuongTapThe');
  }
};