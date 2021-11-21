'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.hasOne(models.User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'Userid'
      })
    }
  };
  Comment.init({
    id: DataTypes.INTEGER,
    Userid: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    Photoid: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    comment: {
      type: DataTypes.TEXT,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};