'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('ContactCategories',[
      {
        name: 'Default',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Friends',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Family',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'CloseFriends',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
   return await queryInterface.bulkDelete('ContactCategories', null, {});
  }
};
