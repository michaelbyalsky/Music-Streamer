'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InteractionsPlaylists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Playlist, {
        foreignKey: 'playlistId'
      })
    }
  };
  InteractionsPlaylists.init({
    userId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER,
    isLike: DataTypes.BOOLEAN,
    playCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InteractionsPlaylists',
  });
  return InteractionsPlaylists;
};