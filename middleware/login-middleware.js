const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const secretKey = "sparta";

// 사용자 인증 미들웨어
module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(" ");

    if (tokenType !== "Bearer") {
      res.status(401).send({
        errMessage: "Bearer토큰이 없습니다.",
      });
      return;
    }

    try {
      const { userId } = jwt.verify(tokenValue, secretKey);
      User.findOne({ _id: userId }).then((user) => {
        res.locals.user = user;
        next();
      });
    } catch (err) {
      res.status(401).send({
        errMessage: "토큰의 유효성을 확인 할 수 없습니다.",
      });
      return;
    }
  } catch (err) {
    next();
  }
};
