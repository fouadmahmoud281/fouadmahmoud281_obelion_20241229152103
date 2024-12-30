module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('users', [
      {
        email: 'john.doe@example.com',
        phone: '1234567890',
        password: 'hashed_password_1', // assuming hashed passwords
      },
      {
        email: 'jane.smith@example.com',
        phone: '0987654321',
        password: 'hashed_password_2',
      },
    ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
