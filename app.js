const express = require("express");
const app = express();
const port = 3000;

// const connect = require("./schemas/index");
// connect();

// 리퀘스트 경로를 남기는 미들웨어
app.use((req, res, next) => {
  console.log("req : ", req.originalUrl, " - ", new Date());
  next();
});

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

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
