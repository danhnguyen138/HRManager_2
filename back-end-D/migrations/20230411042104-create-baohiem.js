'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BaoHiem', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaBH: {
        type: Sequelize.STRING(30),

      },
      MaYT:{
        type: Sequelize.STRING(30)
      },
      NoiKhamYT:{
        type: Sequelize.STRING(100)
      },
      NgayBD: {
        type: Sequelize.DATEONLY,
      },
      LuongDongBaoHiem:{
        type: Sequelize.STRING(30),

      },
      TrangThai:{
        type:Sequelize.STRING(30),
        defaultValue:'Đang tham gia'
      },
      GhiChu:{
        type: Sequelize.STRING,
      },
      NguoiThucHien:{
        type:Sequelize.STRING,
        allowNull:false
      },
      idNhanVien:{
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: 'NhanVien',
          key: 'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'
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
    await queryInterface.dropTable('BaoHiem');
  }
};