'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn('Usuarios', 'role', {
        type: Sequelize.ENUM('admin', 'moderador', 'cliente'),
        allowNull: false,
        defaultValue: 'cliente'
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Usuarios', 'role');
  }
};
