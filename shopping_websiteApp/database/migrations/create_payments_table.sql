const { Sequelize, Model, DataTypes } = require('sequelize');

class Payment extends Model {
  static init(sequelize) {
    super.init({
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

module.exports = Payment;
