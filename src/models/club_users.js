"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Club_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Clubs }) {
      // define association here
      this.hasMany(Clubs, { foreignKey: "id", as: "member" });
    }
    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  Club_users.init(
    {
      club_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Club id can not be empty",
          },
          notNull: {
            msg: "Club id can not be null",
          },
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "user id can not be empty",
          },
          notNull: {
            msg: "user id can not be null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Club_users",
      tableName: "club_users",
    }
  );

  return Club_users;
};
