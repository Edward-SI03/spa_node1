const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const secretKey = "sparta";

// 사용자 인증 미들웨어
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(" ");

  if (tokenType !== "Bearer") {
    res.status(401).send({
      errMessage: "로그인이 필요합니다.",
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
      errMessage: "로그인이 필요합니다.",
    });
    return;
  }
};
