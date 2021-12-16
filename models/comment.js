"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { foreignKey: "users_id" });
      Comment.belongsTo(models.Photo, { foreignKey: "photo_id" });
    }
  }
  Comment.init(
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      // },
      user_id: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        // validate: {
        //   notEmpty: true,
        //   isInt: true,
        // },
      },
      photo_id: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        // validate: {
        //   notEmpty: true,
        //   isInt: true,
        // },
      },
      comment: {
        type: DataTypes.TEXT,
        // allowNull: false,
        // validate: {
        //   notEmpty: true,
        // },
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
