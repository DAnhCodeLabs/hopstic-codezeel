import { DataTypes } from "sequelize";
import sequelize from "../dbs/init.mysql.js";

const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";

const ApiKey = sequelize.define(
  DOCUMENT_NAME,
  {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // true: active, false: block
    },
    permissions: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  },
  {
    timestamps: true,
    tableName: COLLECTION_NAME,
  }
);

export default ApiKey;
