const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");

// 해당 게시글의 댓글 목록보기
router.get("/comments/:postId", async (req, res) => {
  const postId = req.params.postId;
  const datas = await Comment.find(
    { postId: postId },
    { __v: false, password: false, postId: false }
  ).sort({
    createdAt: "desc",
  });

  res.json({
    data: datas.map((e) => {
      return {
        commentId: e._id,
        user: e.user,
        content: e.content,
        createdAt: e.createdAt,
      };
    }),
  });
});

// 해당 게시물에 댓글 달기
router.post("/comments/:postId", async (req, res) => {
  const postId = req.params.postId;
  const { user, password, content } = req.body;
  const createdAt = new Date();

  if (content === "") {
    res.status(400).json({ message: "댓글 내용을 입력해주세요." });
  } else {
    const createComment = await Comment.create({
      postId,
      user,
      password,
      content,
      createdAt,
    });
    res.json({ message: "댓글을 생성하였습니다." });
  }
});

// 해당 댓글의 내용 수정
router.put("/comments/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  const { password, content } = req.body;

  const thisComment = await Comment.findOne({ _id: commentId });

  if (thisComment === null) {
    res.status(400).json({ message: "해당 댓글을 찾을 수 없습니다." });
  } else {
    if (content === "") {
      res.status(400).json({ message: "댓글 내용을 입력해주세요." });
    } else {
      if (Number(password) === thisComment.password) {
        await Comment.updateOne({ _id: commentId }, { $set: { content } });
        res.json({ message: "댓글을 수정하였습니다." });
      } else {
        res.status(400).json({ message: "비밀번호가 맞지 않습니다." });
      }
    }
  }
});

// 해당 댓글 삭제
router.delete("/comments/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { password } = req.body;

  const thisComment = await Comment.findOne({ _id: commentId });

  if (thisComment === null) {
    res.status(400).json({ message: "해당 댓글을 찾을 수 없습니다." });
  } else {
    if (Number(password) === thisComment.password) {
      await Comment.deleteOne({ _id: commentId });
      res.json({ message: "댓글을 삭제하였습니다." });
    } else {
      res.status(400).json({ message: "비밀번호가 맞지 않습니다." });
    }
  }
});

module.exports = router;
