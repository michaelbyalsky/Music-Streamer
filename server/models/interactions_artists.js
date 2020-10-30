'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InteractionsArtists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId'
      })
    }
  };
  InteractionsArtists.init({
    userId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER,
    isLike: DataTypes.BOOLEAN,
    playCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InteractionsArtists',
  });
  return InteractionsArtists;
};