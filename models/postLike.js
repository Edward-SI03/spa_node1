module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "postLike",
    {
      Id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
