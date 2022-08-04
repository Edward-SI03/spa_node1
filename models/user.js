module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};

// const Sequelize = require("sequelize");

// module.exports = class User extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init(
//       {
//         userId: {
//           type: Sequelize.INTEGER.UNSIGNED,
//           allowNull: false,
//           unique: true,
//           primaryKey: true,
//           autoIncrement: true,
//         },
//         nickname: {
//           type: Sequelize.STRING(20),
//           allowNull: false,
//           unique: true,
//         },
//         password: {
//           type: Sequelize.STRING,
//           allowNull: false,
//         },
//       },
//       {
//         sequelize,
//         timestamps: true,
//       }
//     );
//   }
//   static associate(db) {
//     db.User.hasMany(db.Post, { foreignKey: "userId", sourceKey: "userId" });
//   }
// };
