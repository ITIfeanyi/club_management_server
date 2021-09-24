"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Clubs }) {
      // define association here
      this.hasMany(Clubs, { foreignKey: "creator_id", as: "admin" });
    }
    toJSON() {
      return { ...this.get(), password: undefined, updatedAt: undefined };
    }
  }
  Users.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Username can not be null",
          },
          notEmpty: {
            msg: "Username can not be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Email can not be null",
          },
          notEmpty: {
            msg: "Email can not be empty",
          },
          isEmail: {
            msg: "Invalid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password can not be null",
          },
          notEmpty: {
            msg: "Password can not be empty",
          },
          len: {
            args: 6,
            msg: "Password character must be more than 6",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "users",
      tableName: "users",
    }
  );

  return Users;
};
