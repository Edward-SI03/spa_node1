const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");
const User = require("../schemas/user");
const loginMiddleware = require("../middleware/login-middleware");

// 게시글 좋아요
router.put("/posts/:postId/like", loginMiddleware, async (req, res) => {
  const { user } = res.locals;
  if (!user) {
    res.status(400).json({ message: "로그인이 필요합니다." });
    return;
  }

  const { postId } = req.params;

  if (postId.match(/^[0-9a-fA-F]{24}$/)) {
    const thisPost = await Post.findOne({ _id: postId });

    if (thisPost === null) {
      res.status(400).json({ message: "해당 게시물을 찾을 수 없습니다." });
      return;
    } else {
      const userId = user._id.toString();
      const findUserId = thisPost.likeUsers.find((x) => x.userId === userId);

      if (!findUserId || findUserId.userId !== userId) {
        const count = thisPost.likes + 1;
        await Post.updateOne(
          { _id: postId },
          { $push: { likeUsers: { userId: userId } }, likes: count }
        );
        await User.updateOne(
          { _id: user._id },
          { $push: { likePosts: { postId: postId } } }
        );
        res.json({ message: "게시글의 좋아요를 등록하였습니다." });
        return;
      } else {
        const count = thisPost.likes - 1;
        await Post.updateOne(
          { _id: postId },
          { $pull: { likeUsers: { userId: userId } }, likes: count }
        );
        await User.updateOne(
          { _id: user._id },
          { $pull: { likePosts: { postId: postId } } }
        );
        res.json({ message: "게시글의 좋아요를 취소하였습니다." });
        return;
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

  const datas = await User.findOne(
    { _id: user._id },
    { __v: false, password: false, content: false }
  ).sort({
    createdAt: "desc",
  });
  console.log(datas.likePosts);
  const a = [];
  //    function run() {
  datas.likePosts.map(await function run(e) {
     a.push( Post.findOne({ _id: e.postId }, { __v: false, password: false }));
     
  });
  console.log(a[0]);
  //   }
  //   run();
  // async function run2() {
  //   await run();
  //   res.json({
  //     data: a.map((e) => {
  //       return {
  //         postId: e._id,
  //         userId: e.userId,
  //         nickname: e.nickname,
  //         title: e.title,
  //         createdAt: e.createdAt,
  //         updatedAt: e.updatedAt,
  //         likes: e.likes,
  //       };
  //     }),
  //   });
  // }
  // run2()
});

module.exports = router;
