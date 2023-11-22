'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KyLuat', {
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
        onDelete:'SET NULL'
      },
      ThoiGian:{
        type: Sequelize.DATEONLY
      },
      SuViec:{
        type: Sequelize.STRING(100)
      },
      MoTa:{
        type: Sequelize.TEXT
      },
      DiaDiem:{
        type: Sequelize.STRING(100)
      },
      ChungKien:{
        type: Sequelize.STRING(100)
      },
      TuongThuat:{
        type: Sequelize.TEXT
      },
      HinhThucKyLuat:{
        type: Sequelize.TEXT
      },
      SoQD:{
        type: Sequelize.STRING(30)
      },
      NguoiBanHanh:{
        type: Sequelize.STRING(80)
      },
      NgayQD:{
        type:Sequelize.DATEONLY,
        allowNull: false
      },
      TrangThai:{
        type: Sequelize.STRING(30),
        defaultValue: 'Lên kế hoạch'
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
    await queryInterface.dropTable('KyLuat');
  }
};