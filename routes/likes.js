const express = require("express");
const router = express.Router();
// const Post = require("../schemas/post");
// const User = require("../schemas/user");
const { Like, Post } = require("../models");
const loginMiddleware = require("../middleware/login-middleware");

// 게시글 좋아요
router.put("/posts/:postId/like", loginMiddleware, async (req, res) => {
  const { user } = res.locals;
  if (!user) {
    res.status(400).json({ message: "로그인이 필요합니다." });
    return;
  }

  const { postId } = req.params;

  if (postId.match(/^[0-9]$/)) {
    const thisPost = await Post.findOne({ where: { postId } });
    // console.log(thisPost);

    if (thisPost === null) {
      res.status(400).json({ message: "해당 게시물을 찾을 수 없습니다." });
      return;
    } else {
      const userId = user.userId.toString();
      const thisLike = await Like.findOne({ where: { postId, userId } });

      if (thisLike === null) {
        await Like.create({ postId, userId });
        res.json({ message: "게시글의 좋아요를 등록하였습니다." });
      } else {
        await Like.destroy({ where: { postId, userId } });
        res.json({ message: "게시글의 좋아요를 취소하였습니다." });
      }
    }
  } else {
    res.status(400).json({ message: "postId 형식이 맞지 않습니다." });
    return;
  }
});

// 좋아요 누른 게시물 보기
router.get("/posts/like", loginMiddleware, async (req, res) => {
  const { user } = res.locals;
  if (!user) {
    res.status(400).json({ message: "로그인이 필요합니다." });
    return;
  }
  const userId = user.userId;

  const datas = await Like.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });

  // console.log(datas);

  const likePosts = datas.map((e) => {
    return Post.findAll({ where: { postId: e.postId } });
  });
  // console.log(likePosts)
  Promise.all(likePosts).then((value) => {
    // console.log(value);

    res.json({
      data: value.map((e) => {
        console.log(e);

        return e[0]
      }),
    });
  });
});

module.exports = router;
