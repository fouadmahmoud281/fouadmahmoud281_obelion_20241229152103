const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('shopping_website', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Payment extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      cardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isCreditCard: true
        }
      },
      expiryDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isDate: true
        }
      },
      cvv: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 4]
        }
      },
      nameOnCard: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    }, {
      sequelize,
      modelName: 'Payment',
      tableName: 'payments',
      timestamps: false
    });
  }
}

Payment.init(sequelize);

module.exports = Payment;