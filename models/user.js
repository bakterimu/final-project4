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
      User.hasMany(models.Photo, {
        foreignKey: "users_id",
      });
      User.hasMany(models.Comment, { foreignKey: "photo_id" });
      User.hasMany(models.SocialMedia, { foreignKey: "users_id" });
    }
  };
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    profile_image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true,
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};