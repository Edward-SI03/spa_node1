const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");
const loginMiddleware = require("../middleware/login-middleware");

// 게시물 조회
router.get("/", async (req, res) => {
  const datas = await Post.find(
    {},
    { __v: false, password: false, content: false }
  ).sort({
    createdAt: "desc",
  });

  res.json({
    data: datas.map((e) => {
      return {
        postId: e._id,
        userId: e.userId,
        nickname: e.nickname,
        title: e.title,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
        likes: e.likes,
      };
    }),
  });
});

// 게시물 상세 조회
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;

  if (postId.match(/^[0-9a-fA-F]{24}$/)) {
    const datas = await Post.findOne(
      { _id: postId },
      { __v: false, password: false }
    );

    if (datas === null) {
      res.status(400).json({ message: "해당 게시물을 찾을 수 없습니다." });
      return;
    } else {
      res.json({
        data: {
          postId: datas._id,
          userId: datas.userId,
          nickname: datas.nickname,
          title: datas.title,
          content: datas.content,
          createdAt: datas.createdAt,
          updatedAt: datas.updatedAt,
          likes: datas.likes,
        },
      });
      return;
    }
  } else {
    res.status(400).json({ message: "postId 형식이 맞지 않습니다." });
    return;
  }
});

// 게시물 작성
router.post("/", loginMiddleware, async (req, res) => {
  const { user } = res.locals;
  if (!user) {
    res.status(400).json({ message: "로그인이 필요합니다." });
    return;
  }

  const { title, content } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();
  const likes = 0;

  const createPost = await Post.create({
    userId: user._id,
    nickname: user.nickname,
    title,
    content,
    createdAt,
    updatedAt,
    likes,
  });
  res.json({ message: "게시글을 생성하였습니다." });
  return;
});

// 게시물 수정
router.put("/:postId", loginMiddleware, async (req, res) => {
  const { user } = res.locals;

  if (!user) {
    res.status(400).json({ message: "로그인이 필요합니다." });
    return;
  }

  const postId = req.params.postId;
  const { title, content } = req.body;
  const updatedAt = new Date();

  if (postId.match(/^[0-9a-fA-F]{24}$/)) {
    const thisPost = await Post.findOne({ _id: postId });

    if (thisPost === null) {
      res.status(400).json({ message: "해당 게시물을 찾을 수 없습니다." });
      return;
    } else {
      if (user._id.toString() === thisPost.userId) {
        await Post.updateOne(
          { _id: postId },
          { $set: { title, content, updatedAt } }
        );
        res.json({ message: "게시글을 수정하였습니다." });
        return;
      } else {
        res.status(400).json({ message: "작성자가 다릅니다." });
        return;
      }
    }
  } else {
    res.status(400).json({ message: "postId 형식이 맞지 않습니다." });
    return;
  }
});

// 게시물 삭제
router.delete("/:postId", loginMiddleware, async (req, res) => {
  const { user } = res.locals;

  if (!user) {
    res.status(400).json({ message: "로그인이 필요합니다." });
    return;
  }

  const postId = req.params.postId;

  if (postId.match(/^[0-9a-fA-F]{24}$/)) {
    const thisPost = await Post.findOne({ _id: postId });

    if (thisPost === null) {
      res.status(400).json({ message: "해당 게시물을 찾을 수 없습니다." });
      return;
    } else {
      if (user._id.toString() === thisPost.userId) {
        await Post.deleteOne({ _id: postId });
        res.json({ message: "게시글을 삭제하였습니다." });
        return;
      } else {
        res.status(400).json({ message: "작성자가 다릅니다." });
        return;
      }
    }
  } else {
    res.status(400).json({ message: "postId 형식이 맞지 않습니다." });
    return;
  }
});

module.exports = router;
