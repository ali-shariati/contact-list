'use strict';
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('Users', [
      { fullName: 'Ali Shariati',  userName: 'ali',  password: 'test1234', createdAt: now, updatedAt: now },
      { fullName: 'Amir Sharitati',userName: 'amir', password: 'test1234', createdAt: now, updatedAt: now },
      { fullName: 'Lili Sharitati',userName: 'lil',  password: 'test1234', createdAt: now, updatedAt: now }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
