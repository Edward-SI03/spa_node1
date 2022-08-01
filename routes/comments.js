const express = require("express");
const router = express.Router();
// const Comment = require("../schemas/comment");
// const Post = require("../schemas/post");
const { Post, Comment } = require("../models");
const loginMiddleware = require("../middleware/login-middleware");

// 해당 게시글의 댓글 목록보기
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;

  if (postId.match(/^[0-9]$/)) {
    const realPost = await Post.findOne({ where: { postId } });
    if (realPost === null) {
      res.status(400).json({ message: "해당 게시물을 찾을 수 없습니다." });
      return;
    } else {
      const datas = await Comment.findAll(
        { where: { postId }, order: [["createdAt", "DESC"]] }
        // { __v: false, password: false, postId: false }
      );
      // .sort({
      //   createdAt: "desc",
      // });

      res.json({
        data: datas.map((e) => {
          return {
            commentId: e.commentId,
            userId: e.userId,
            nickname: e.nickname,
            comment: e.comment,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
          };
        }),
      });
      return;
    }
  } else {
    res.status(400).json({ message: "postId 형식이 맞지 않습니다." });
    return;
  }
});

// 해당 게시물에 댓글 달기
router.post("/:postId", loginMiddleware, async (req, res) => {
  const { user } = res.locals;
  if (!user) {
    res.status(400).json({ message: "로그인이 필요합니다." });
    return;
  }

  const postId = req.params.postId;
  const { comment } = req.body;
  // const createdAt = new Date();
  // const updatedAt = new Date();

  if (postId.match(/^[0-9]$/)) {
    const realPost = await Post.findOne({ where: { postId } });
    if (realPost === null) {
      res.status(400).json({ message: "해당 게시물을 찾을 수 없습니다." });
      return;
    } else {
      if (comment === "") {
        res.status(400).json({ message: "댓글 내용을 입력해주세요." });
        return;
      } else {
        const createComment = await Comment.create({
          postId,
          userId: user.userId,
          nickname: user.nickname,
          comment,
          // createdAt,
          // updatedAt,
        });
        res.json({ message: "댓글을 생성하였습니다." });
        return;
      }
    }
  } else {
    res.status(400).json({ message: "postId 형식이 맞지 않습니다." });
    return;
  }
});

// 해당 댓글의 내용 수정
router.put("/:commentId", loginMiddleware, async (req, res) => {
  const { user } = res.locals;
  if (!user) {
    res.status(400).json({ message: "로그인이 필요합니다." });
    return;
  }

  const commentId = req.params.commentId;
  const { comment } = req.body;
  // const updatedAt = new Date();

  if (commentId.match(/^[0-9]$/)) {
    const thisComment = await Comment.findOne({ where: { commentId } });

    if (thisComment === null) {
      res.status(400).json({ message: "해당 댓글을 찾을 수 없습니다." });
      return;
    } else {
      if (comment === "") {
        res.status(400).json({ message: "댓글 내용을 입력해주세요." });
        return;
      } else {
        if (user.userId.toString() === thisComment.userId) {
          await Comment.update({ comment }, { where: { commentId } });
          res.json({ message: "댓글을 수정하였습니다." });
          return;
        } else {
          res.status(400).json({ message: "작성자가 다릅니다." });
          return;
        }
      }
    }
  } else {
    res.status(400).json({ message: "commentId 형식이 맞지 않습니다." });
    return;
  }
});

// 해당 댓글 삭제
router.delete("/:commentId", loginMiddleware, async (req, res) => {
  const { user } = res.locals;
  if (!user) {
    res.status(400).json({ message: "로그인이 필요합니다." });
    return;
  }

  const { commentId } = req.params;

  if (commentId.match(/^[0-9]$/)) {
    const thisComment = await Comment.findOne({ where:{commentId} });

    if (thisComment === null) {
      res.status(400).json({ message: "해당 댓글을 찾을 수 없습니다." });
    } else {
      if (user.userId.toString() === thisComment.userId) {
        await Comment.destroy({ where:{commentId} });
        res.json({ message: "댓글을 삭제하였습니다." });
      } else {
        res.status(400).json({ message: "작성자가 다릅니다." });
      }
    }
  } else {
    res.status(400).json({ message: "commentId 형식이 맞지 않습니다." });
  }
});

module.exports = router;
