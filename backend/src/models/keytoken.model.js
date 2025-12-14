import { DataTypes } from "sequelize";
import sequelize from "../dbs/init.mysql.js";
import User from "./user.model.js";

const KeyToken = sequelize.define(
  "KeyToken",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    refresh_tokens_used: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  },
  {
    tableName: "KeyTokens",
    timestamps: true,
  }
);
export default KeyToken;
