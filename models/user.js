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
      // define association here
      User.belongsTo(models.Comment, { foreignKey: 'Userid' });
      User.belongsTo(models.Photo, { foreignKey: 'Userid' });
      User.belongsTo(models.SocialMedia), { foreignKey: 'Userid' };
    }
  };
  User.init({
    id: DataTypes.INTEGER,
    full_name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true
      },
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    profile_image: {
      type: DataTypes.TEXT,
      validate: {
        notNull: true,
        notEmpty: true,
        isUrl: true
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    },
    phone_number: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};