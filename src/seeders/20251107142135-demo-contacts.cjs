'use strict';

const path = require('path');
const { readFile } = require('fs/promises');

const PROFILE_PICTURE_BASE_PATH = path.resolve('src', 'seeders', 'profilePictures' )

function getRandomNumber(min, max) { return Math.floor(Math.random() * (max - min)) + min; }

async function generateSampleContacts({count, ContactCategories, Users}) {
  const { faker } = require('@faker-js/faker');
  const data  = [];

  for (let i = 1; i <= count; i++) {
    const profilePicture = await readFile(`${PROFILE_PICTURE_BASE_PATH}/${getRandomNumber(1, 5)}.jpeg`);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    // const mobileNumber = faker.phone.number('+98##########');
    const mobileNumber = `+98${faker.string.numeric(10)}`;
    const createdAt = faker.date.past();
    const updatedAt = faker.date.recent();
    const isFavorite = faker.helpers.arrayElement([true, false]);
    const ContactCategoryId = ContactCategories[getRandomNumber(0, ContactCategories.length - 1)].id;
    const UserId = Users[getRandomNumber(0, Users.length - 1)].id;

    const records = {
      profilePicture,
      firstName,
      lastName,
      mobileNumber,
      isFavorite,
      createdAt,
      updatedAt,
      ContactCategoryId,
      UserId
    }
    data.push(records);
  }
  return data;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const [ContactCategories] = await queryInterface.sequelize.query('SELECT id FROM "ContactCategories";')
    const [Users] = await queryInterface.sequelize.query('SELECT id FROM "Users" ;')
    await queryInterface.bulkInsert('Contacts',
       await generateSampleContacts({ count: 500, ContactCategories, Users})
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Contacts', null, {})
  }
};
