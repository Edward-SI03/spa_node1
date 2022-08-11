const UsersService = require("../services/users.service");

const Joi = require("joi");

class UsersController {
  usersservice = new UsersService();

  signup = async (req, res) => {
    try {
      const userLogin = res.locals.user;

      const signupSchema = Joi.object({
        nickname: Joi.string().required().min(3).alphanum(),
        password: Joi.string().required().min(4).alphanum(),
        confirm: Joi.string().required().min(4).alphanum(),
      });

      const { nickname, password, confirm } = await signupSchema.validateAsync(
        req.body
      );

      const signup = this.usersservice.signup(
        userLogin,
        nickname,
        password,
        confirm
      );

      if (signup.errMessage) {
        res.status(400).json({ err: signup });
        return;
      }

      res.status(200).json({ data: signup });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "입력 형식이 맞지 않습니다." });
      return;
    }
  };

  login = async (req, res) => {
    try {
      const userLogin = res.locals.user;

      const loginSchema = Joi.object({
        nickname: Joi.string().required().min(3).alphanum(),
        password: Joi.string().required().min(4).alphanum(),
      });

      const { nickname, password } = await loginSchema.validateAsync(req.body);

      const login = this.usersservice.login(userLogin, nickname, password);

      if (login.errMessage) {
        res.status(400).json({ err: login });
        return;
      }

      res.status(200).json({ data: login });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "입력 형식이 맞지 않습니다." });
      return;
    }
  };

  check = async (req, res) => {
    const { user } = res.locals;
    res.json({
      user: {
        userId: user.userId,
        nickname: user.nickname,
      },
    });
  };
}

module.exports = UsersController;
