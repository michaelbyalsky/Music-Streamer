'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Interaction, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
      })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    user_password: DataTypes.STRING,
    preferences: DataTypes.JSON,
    remember_token: DataTypes.TINYINT(1)
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};