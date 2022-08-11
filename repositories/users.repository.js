// const User = require("../schemas/user");
const { User } = require("../models");

class UsersRepository {
  sameNic = async (nickname) => {
    const sameNic = await User.findOne({
      where: { nickname },
    });
    return sameNic;
  };

  creatUser = async (nickname, password) => {
    await User.create({ nickname, password });
  };

  sameId = async (nickname, password) => {
    const sameId = await User.findOne({
      where: { nickname, password },
    });
    return sameId;
  };
}

module.exports = UsersRepository;
