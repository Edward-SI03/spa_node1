module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "post",
    {
      postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
    },
    {
      timestamps: true,
    }
  );
};

// const Sequelize = require("sequelize");
// const { static } = require("express");
// const { associate } = require("./user");

// module.exports = class Post extends Sequelize.Model {
//   static int(sequelize) {
//     return super.init(
//       {
//         postId: {
//           type: Sequelize.INTEGER.UNSIGNED,
//           allowNull: false,
//           unique: true,
//           primaryKey: true,
//           autoIncrement: true,
//         },
//         title: {
//           type: Sequelize.STRING(20),
//           allowNull: false,
//         },
//         content: {
//           type: Sequelize.TEXT,
//           allowNull: false,
//         },
//         likes: {
//           type: Sequelize.INTEGER,
//         },
//       },
//       {
//         sequelize,
//         timestamps: true,
//       }
//     );
//   }
//   static associate(db) {
//     db.Post.belongsTo(db.User, { foreignKey: "userId", targetKey: "userId" });
//   }
// };
