'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('ContactCategories', [
      { name: 'Default',      createdAt: new Date(), updatedAt: new Date() },
      { name: 'Friends',      createdAt: new Date(), updatedAt: new Date() },
      { name: 'Family',       createdAt: new Date(), updatedAt: new Date() },
      { name: 'CloseFriends', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('ContactCategories', null, {});
  }
};
