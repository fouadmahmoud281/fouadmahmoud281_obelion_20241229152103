module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('payments', [
      {
        cardNumber: '4111111111111111',
        expiryDate: '12/24',
        cvv: '123',
        nameOnCard: 'John Doe'
      },
      {
        cardNumber: '5555555555554444',
        expiryDate: '11/23',
        cvv: '456',
        nameOnCard: 'Jane Smith'
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('payments', null, {})
};
