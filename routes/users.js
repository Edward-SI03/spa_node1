const express = require("express");
const router = express.Router();

const loginMiddleware = require("../middleware/login-middleware");

const UsersController = require("../controllers/users.controller");
const userscontroller = new UsersController();

// 회원가입
router.post("/signup", loginMiddleware, userscontroller.signup);

// 로그인
router.post("/login", loginMiddleware, userscontroller.login);

// 정보조회 test
router.get("/user/me", loginMiddleware, userscontroller.check);

module.exports = router;
