const express = require("express");
const app = express();
const port = 3000;

const connect = require("./schemas/index");
connect();

// 리퀘스트 경로를 남기는 미들웨어
app.use((req, res, next) => {
  console.log("req : ", req.originalUrl, " - ", new Date());
  next();
});

app.use(express.json());

const Router = require("./routes/index");
app.use("/", [Router]);

app.get("/", (req, res) => {
  res.json({
    // 게시글 기능
    "게시글 조회": {
      경로: "/posts",
      메소드: "get",
      예외처리: "없음",
    },
    "게시글 작성": {
      경로: "/posts",
      메소드: "post",
      예외처리: "없음",
    },
    "게시글 상세 조회": {
      경로: "/posts/:postId",
      메소드: "get",
      예외처리: "postsId 유효성 검사, 해당 게시물 유무 확인",
    },
    "게시글 수정": {
      경로: "/posts/:postId",
      메소드: "put",
      예외처리: "postsId 유효성 검사, 해당 게시물 유무 확인, 비밀번호 확인",
    },
    "게시글 삭제": {
      경로: "/posts/:postId",
      메소드: "delete",
      예외처리: "postsId 유효성 검사, 해당 게시물 유무 확인, 비밀번호 확인",
    },
    // 댓글 기능
    "게시글 댓글 목록 조회": {
      경로: "/comments/:postId",
      메소드: "get",
      예외처리: "postsId 유효성 검사, 해당 게시물 유무 확인",
    },
    "게시글 댓글 작성": {
      경로: "/comments/:postId",
      메소드: "post",
      예외처리:
        "postsId 유효성 검사, 해당 게시물 유무 확인, 댓글 내용 공백 확인",
    },
    "게시글 댓글 수정": {
      경로: "/comments/commentId",
      메소드: "put",
      예외처리:
        "postsId 유효성 검사, 해당 게시물 유무 확인, 댓글 내용 공백 확인, 비밀번호 확인",
    },
    "게시글 댓글 삭제": {
      경로: "/comments/commentId",
      메소드: "delete",
      예외처리: "postsId 유효성 검사, 해당 게시물 유무 확인, 비밀번호 확인",
    },
  });
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸습니다.");
});
