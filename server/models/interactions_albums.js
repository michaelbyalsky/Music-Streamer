'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interactions_Albums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Album, {
        foreignKey: 'album_id'
      })
    }
  };
  Interactions_Albums.init({
    user_id: DataTypes.INTEGER,
    album_id: DataTypes.INTEGER,
    artist_id: DataTypes.INTEGER,
    is_like: DataTypes.BOOLEAN,
    play_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Interactions_Albums',
  });
  return Interactions_Albums;
};