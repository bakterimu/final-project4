'use strict';
const {
    Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Photo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Photo.belongsTo(models.User, { foreignKey: "users_id" });
            Photo.hasMany(models.Comment, { foreignKey: "photo_id" });
        }
    };


    Photo.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter your title !'
                },
                notEmpty: {
                    msg: 'Please enter your title !'
                }
            }
        },
        caption: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter your caption !'
                },
                notEmpty: {
                    msg: 'Please enter your caption !'
                }
            }
        },
        poster_image_url: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter your Poster !'
                },
                notEmpty: {
                    msg: 'Please enter your Poster !'
                },
                isUrl: { msg: 'Invalid URL' }
            }
        },
        users_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Photo',
    });

    return Photo;
};