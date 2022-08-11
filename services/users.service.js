const UsersRepository = require("../repositories/users.repository");

const secretKey = "sparta";
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// const User = require("../schemas/user");
const { User } = require("../models");

// 요청된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어, express의 request(req) 객체에 cookies 속성이 부여
// router.use(cookieParser());

class UsersService {
  usersRepository = new UsersRepository();

  signup = async (userLogin, nickname, password, confirm) => {
    if (userLogin) {
      return { errMessage: "이미 로그인이 되어있습니다." };
    }

    if (password !== confirm) {
      return { errMessage: "비밀번호가 일치하지 않습니다." };
    }

    if (password.includes(nickname)) {
      return { errMessage: "비밀번호에 닉네임이 들어갈 수 없습니다." };
    }

    const user = await User.findOne({
      where: { nickname },
    });

    if (user) {
      return { errMessage: "중복된 닉네임입니다." };
    } else {
      await User.create({ nickname, password });
      return { message: "회원 가입에 성공하였습니다." };
    }
  };

  login = async (userLogin, nickname, password) => {
    if (userLogin) {
      return { errMessage: "이미 로그인이 되어있습니다." };
    }

    const user = await User.findOne({
      where: { nickname, password },
    });

    if (!user) {
      return { errMessage: "닉네임 또는 패스워드를 확인해주세요." };
    } else {
      // 토큰 유효기간 1day 설정
      const options = { expiresIn: "1d" };

      const token = jwt.sign(
        { userId: user.userId, nickname },
        secretKey,
        options
      );
      res.cookie("token", token);
      res.json({ token: token });
    }
  };
}

module.exports = UsersService;
