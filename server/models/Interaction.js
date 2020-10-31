'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Interaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.belongsTo(models.User, {
          foreignKey: 'userId',
        });
        this.belongsTo(models.Song, {
          foreignKey: 'songId',
        })
      }
    }

  Interaction.init({
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    isLike: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
     },
    playCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Interaction',
  });
  return Interaction;
};