import { DataTypes } from "sequelize";
import sequelize from "../dbs/init.mysql.js";
import slugify from "slugify";
import bcrypt from "bcrypt";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      defaultValue: "other",
    },
    roles: {
      type: DataTypes.JSON,
      defaultValue: ["USER"],
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "blocked"),
      defaultValue: "pending",
    },

    // --- 4. XÁC THỰC (Email Verify) ---
    verify_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verify_expire: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // --- 5. SOCIAL LOGIN (Mở rộng sau này) ---
    auth_type: {
      type: DataTypes.ENUM("local", "google", "facebook"),
      defaultValue: "local",
    },
    auth_google_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // --- 6. AUDIT & SECURITY (Thống kê) ---
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    login_retry_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Mặc định là 0 xu
      allowNull: false,
    },
  },
  {
    tableName: "User",
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.name) {
          user.slug =
            slugify(user.name, { lower: true }) +
            "-" +
            Math.floor(Math.random() * 1000);
        }
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

User.prototype.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default User;