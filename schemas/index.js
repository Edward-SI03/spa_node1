const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/spaNode1", { ignoreUndefined: true })
    .catch((err) => console.log(err));
};

module.exports = connect;
