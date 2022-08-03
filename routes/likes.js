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

    if (thisPost === null) {
      res.status(400).json({ message: "해당 게시물을 찾을 수 없습니다." });
      return;
    } else {
      const userId = user.userId.toString();
      const thisLike = await Like.findOne({ where: { postId, userId } });

      if (thisLike === null) {
        const count = thisPost.likes + 1;
        console.log(count)
        await Post.update({ likes: count }, { where: { postId } });
        await Like.create({ postId, userId });
        
        res.json({ message: "게시글의 좋아요를 등록하였습니다." });
      } else {
        const count = thisPost.likes - 1;
        await Post.update({ likes: count }, { where: { postId } });
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
        // console.log(e);
        return {
          postId: e[0].postId,
          userId: e[0].userId,
          nickname: e[0].nickname,
          title: e[0].title,
          createdAt: e[0].createdAt,
          updatedAt: e[0].updatedAt,
          likes: e[0].likes,
        };
      }),
    });
  });
});

module.exports = router;
