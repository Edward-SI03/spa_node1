const express = require("express");
const app = express();
const port = 3000;

// const connect = require("./schemas/index");
// connect();

const sequelize = require("./models").sequelize;

// 리퀘스트 경로를 남기는 미들웨어
app.use((req, res, next) => {
  console.log("req : ", req.originalUrl, " - ", new Date());
  next();
});

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
sequelize
  .sync({ force: false })
  .then(() => console.log("db접속 성공"))
  .catch((err) => console.log(err));

const Router = require("./routes/index");
app.use(Router);

app.get("/", (req, res) => {
  res.json({
    "항해 8기 E반": "시진엽",
  });
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸습니다.");
});
