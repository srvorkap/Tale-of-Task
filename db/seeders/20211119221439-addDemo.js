'use strict';

const { bcrypt } = require("../../routes/utils");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert('Users', [{
      firstName: "Demo",
      lastName: "Demo",
      email: "demo@demo.com",
      level: 1,
      exp: 0,
      hashedPassword: bcrypt.hashSync('Abc1!', 11),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    return queryInterface.bulkInsert('Lists', [
      {name: 'Inbox', userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Personal', userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Work', userId: 1, createdAt: new Date(), updatedAt: new Date()},
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Lists', null, {});
    return queryInterface.bulkDelete('Users', null, {});
    }
};
