const { Model, DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('shopping_website', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'users',
      tableName: 'users',
      timestamps: false
    });
  }
}

User.init(sequelize);

module.exports = User;