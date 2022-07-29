const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");
const Post = require("../schemas/post");
const loginMiddleware = require("../middleware/login-middleware");

// 해당 게시글의 댓글 목록보기
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;

  if (postId.match(/^[0-9a-fA-F]{24}$/)) {
    const realPost = await Post.findOne({ _id: postId });
    if (realPost === null) {
      res.status(400).json({ message: "해당 게시물을 찾을 수 없습니다." });
      return;
    } else {
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
  const createdAt = new Date();
  const updatedAt = new Date();

  if (postId.match(/^[0-9a-fA-F]{24}$/)) {
    const realPost = await Post.findOne({ _id: postId });
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
          userId: user._id,
          nickname: user.nickname,
          comment,
          createdAt,
          updatedAt,
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
  const updatedAt = new Date();

  if (commentId.match(/^[0-9a-fA-F]{24}$/)) {
    const thisComment = await Comment.findOne({ _id: commentId });

    if (thisComment === null) {
      res.status(400).json({ message: "해당 댓글을 찾을 수 없습니다." });
      return;
    } else {
      if (comment === "") {
        res.status(400).json({ message: "댓글 내용을 입력해주세요." });
        return;
      } else {
        if (user._id.toString() === thisComment.userId) {
          await Comment.updateOne({ _id: commentId }, { $set: { comment, updatedAt } });
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

  if (commentId.match(/^[0-9a-fA-F]{24}$/)) {
    const thisComment = await Comment.findOne({ _id: commentId });

    if (thisComment === null) {
      res.status(400).json({ message: "해당 댓글을 찾을 수 없습니다." });
    } else {
      if (user._id.toString() === thisComment.userId) {
        await Comment.deleteOne({ _id: commentId });
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
