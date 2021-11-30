'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SocialMedia.init({
    name: {type : DataTypes.STRING ,
      validate: {
        notNull: {
            msg: 'Please enter your name !'
        },
        notEmpty: {
            msg: 'Please enter your name !'
        }
    }
    },
    social_media_url: {type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Please enter your Social Media !'
      },
      notEmpty: {
          msg: 'Please enter your Social Media !'
      },
      isUrl: { msg: 'Invalid URL' }
    }
    },
    users_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SocialMedia',
  });
  return SocialMedia;
};