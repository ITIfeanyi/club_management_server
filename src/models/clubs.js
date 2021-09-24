"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clubs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users, Club_users }) {
      // define association here
      this.belongsTo(users, { foreignKey: "creator_id", as: "admin" });
      this.hasMany(Club_users, { foreignKey: "club_id", as: "member" });
    }

    toJSON() {
      return { ...this.get(), password: undefined, updatedAt: undefined };
    }
  }

  Clubs.init(
    {
      club_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Club name can not be empty",
          },
          notNull: {
            msg: "Club name can not be null",
          },
        },
      },
      creator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Creator can not be empty",
          },
          notNull: {
            msg: "Creator name can not be null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Clubs",
      tableName: "clubs",
    }
  );
  return Clubs;
};
