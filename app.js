const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.Port;

// const connect = require("./schemas/index");
// connect();

const sequelize = require("./models").sequelize;

const fs = require("fs");
const http = require("http");
const https = require("https");

const options = {
  ca: fs.readFileSync("/etc/letsencrypt/live/내 도메인 네임/fullchain.pem"),
  key: fs.readFileSync("/etc/letsencrypt/live/내 도메인 네임/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/내 도메인 네임/cert.pem"),
};

// 리퀘스트 경로를 남기는 미들웨어
app.use((req, res, next) => {
  console.log("req : ", req.originalUrl, " - ", new Date());
  next();
});

app.use(express.static("public"));
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

// app.listen(port, () => {
//   console.log(port, "포트로 서버가 열렸습니다.");
// });

http.createServer(app).listen(3000);
https.createServer(options, app).listen(443);
