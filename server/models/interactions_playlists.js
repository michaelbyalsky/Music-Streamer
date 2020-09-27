'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interactions_Playlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Playlist, {
        foreignKey: 'playlist_id'
      })
    }
  };
  Interactions_Playlists.init({
    user_id: DataTypes.INTEGER,
    playlist_id: DataTypes.INTEGER,
    is_like: DataTypes.BOOLEAN,
    play_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Interactions_Playlists',
  });
  return Interactions_Playlists;
};