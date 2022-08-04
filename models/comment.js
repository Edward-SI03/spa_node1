module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "comment",
      {
        commentId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          unique: true,
          primaryKey: true,
          autoIncrement: true,
        },
        comment: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        timestamps: true,
      }
    );
  };
  