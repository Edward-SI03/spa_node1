const express = require("express");
const app = express();
const port = 3000;

const connect = require("./schemas/index");
connect()

// 리퀘스트 경로를 남기는 미들웨어
app.use((req, res, next) => {
  console.log("req : ", req.originalUrl, " - ", new Date());
  next();
});

app.use(express.json())



const postsRouter = require("./routes/posts");
app.use("/", [postsRouter]);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸습니다.");
});
