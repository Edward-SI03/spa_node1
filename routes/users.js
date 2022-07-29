const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const loginMiddleware = require("../middleware/login-middleware");
const Joi = require("joi");
const secretKey = "sparta";

// 요청된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어, express의 request(req) 객체에 cookies 속성이 부여
router.use(cookieParser());

// 회원가입
const signupSchema = Joi.object({
  nickname: Joi.string().required().min(3).alphanum(),
  password: Joi.string().required().min(4).alphanum(),
  confirm: Joi.string().required().min(4).alphanum(),
});
router.post("/signup", loginMiddleware, async (req, res) => {
  const { user } = res.locals;

  if (user) {
    res.status(400).json({ message: "이미 로그인이 되어있습니다." });
    return;
  }
  try {
    const { nickname, password, confirm } = await signupSchema.validateAsync(
      req.body
    );

    if (password !== confirm) {
      res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
      return;
    }
    if (password.includes(nickname)) {
      res
        .status(400)
        .json({ message: "비밀번호에 닉네임이 들어갈 수 없습니다." });
      return;
    }

    const user = await User.findOne({ nickname });

    if (user) {
      res.status(400).json({ message: "중복된 닉네임입니다." });
      return;
    } else {
      await User.create({ nickname, password });
      res.status(201).json({ message: "회원 가입에 성공하였습니다." });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "입력 형식이 맞지 않습니다." });
    return;
  }
});

// 로그인
router.post("/login", loginMiddleware, async (req, res) => {
  const { user } = res.locals;

  if (user) {
    res.status(400).json({ message: "이미 로그인이 되어있습니다." });
    return;
  }
  try {
    const options = {expiresIn: '1d'};
    const { nickname, password } = await signupSchema.validateAsync(req.body);

    const user = await User.findOne({ nickname, password });

    if (!user) {
      res.status(400).json({ message: "닉네임 또는 패스워드를 확인해주세요." });
      return;
    } else {
      const token = jwt.sign({ userId: user.userId, nickname }, secretKey, options);
      res.cookie("token", token);
      res.json({ token: token });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "입력 형식이 맞지 않습니다." });
    return;
  }
});

// 정보조회
router.get("/user/me", loginMiddleware, async (req, res) => {
  const { user } = res.locals;
  res.json({
    user: {
      userId: user._id,
      nickname: user.nickname,
    },
  });
});

module.exports = router;
