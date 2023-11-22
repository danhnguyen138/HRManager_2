'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LichSuPhongBan', {
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
      TenPhongBanCu: {
        type: Sequelize.STRING(50),
   
      },
      TenChucVuCu: {
        type: Sequelize.STRING(50),

      },
      TenPhongBanMoi: {
        type: Sequelize.STRING(50),

      },
      TenChucVuMoi: {
        type: Sequelize.STRING(50),

      },
      LyDo: {
        type: Sequelize.TEXT,

      },
      SoQD: {
        type: Sequelize.STRING(30)
      },
      NgayQD: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      NguoiBanHanh: {
        type: Sequelize.STRING(50)
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
    await queryInterface.dropTable('LichSuPhongBan');
  }
};