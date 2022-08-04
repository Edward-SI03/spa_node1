const path = require("path");
const Sequelize = require("sequelize");
// const User = require("./user");
// const Post = require('./post');
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.json"))[
  env
];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// db.User = User;
// User.init(sequelize);

// db.Post = Post;
// Post.init(sequelize);

// User.associate(db);
// Post.associate(db);

db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
db.Like = require("./like")(sequelize, Sequelize);

db.User.hasMany(db.Post, { foreignKey: "userId", sourceKey: "userId" });
db.Post.belongsTo(db.User, { foreignKey: "userId", targetKey: "userId" });

db.Post.hasMany(db.Comment, { foreignKey: "postId", sourceKey: "postId" });
db.User.hasMany(db.Comment, { foreignKey: "userId", sourceKey: "userId" });
db.Comment.belongsTo(db.Post, { foreignKey: "postId", targetKey: "postId" });
db.Comment.belongsTo(db.User, { foreignKey: "userId", targetKey: "userId" });

db.Post.belongsToMany(db.User, { through: "likes", foreignKey: "postId", sourceKey: "postId" });
db.User.belongsToMany(db.Post, { through: "likes", foreignKey: "userId", sourceKey: "userId" });
// db.Like.belongsTo(db.Post, { foreignKey: "postId", targetKey: "postId" });
// db.Like.belongsTo(db.User, { foreignKey: "userId", targetKey: "userId" });
// db.sequelize.models.likes

module.exports = db;
