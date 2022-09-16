const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.Port;

// const connect = require("./schemas/index");
// connect();

const sequelize = require("./models").sequelize;
const cors = require("cors");

const fs = require("fs");
const http = require("http");
const https = require("https");

const options = {
  ca: fs.readFileSync("/etc/letsencrypt/live/jinyeop.shop/fullchain.pem"),
  key: fs.readFileSync("/etc/letsencrypt/live/jinyeop.shop/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/jinyeop.shop/cert.pem"),
};

app.use(
  cors({
    origin: true, // 출처 허용 옵션
    withCredentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  })
);

app.use(express.static("public"));

// 리퀘스트 경로를 남기는 미들웨어
// app.use((req, res, next) => {
//   console.log("req : ", req.originalUrl, " - ", new Date());
//   next();
// });

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
    "항해 8기 E반": "시진엽7",
  });
});

// app.listen(port, () => {
//   console.log(port, "포트로 서버가 열렸습니다.");
// });

http.createServer(app).listen(3000);
https.createServer(options, app).listen(443);
