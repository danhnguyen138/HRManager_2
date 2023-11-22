'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('BangCap', 'idNhanVien', {
      type: Sequelize.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('BangCap', 'idNhanVien');
  }
};
