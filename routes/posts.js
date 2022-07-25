const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");

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
        user: e.user,
        title: e.title,
        createdAt: e.createdAt,
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

    const thisPost = await Post.findOne({ _id: postId });

    if (thisPost === null) {
      res.status(400).json({ message: "해당 게시물을 찾을 수 없습니다." });
    } else {
      res.json({
        data: {
          postId: datas._id,
          user: datas.user,
          title: datas.title,
          content: datas.content,
          createdAt: datas.createdAt,
        },
      });
    }
  } else {
    res.status(400).json({ message: "id 형식이 맞지 않습니다." });
  }
});

// 게시물 작성
router.post("/", async (req, res) => {
  const { user, password, title, content } = req.body;
  const createdAt = new Date();

  const createPost = await Post.create({
    user,
    password,
    title,
    content,
    createdAt,
  });
  res.json({ message: "게시글을 생성하였습니다." });
});

// 게시물 수정
router.put("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const { password, title, content } = req.body;

  if (postId.match(/^[0-9a-fA-F]{24}$/)) {
    const thisPost = await Post.findOne({ _id: postId });

    if (thisPost === null) {
      res.status(400).json({ message: "해당 게시물을 찾을 수 없습니다." });
    } else {
      if (Number(password) === thisPost.password) {
        await Post.updateOne({ _id: postId }, { $set: { title, content } });
        res.json({ message: "게시글을 수정하였습니다." });
      } else {
        res.status(400).json({ message: "비밀번호가 맞지 않습니다." });
      }
    }
  } else {
    res.status(400).json({ message: "id 형식이 맞지 않습니다." });
  }
});

// 게시물 삭제
router.delete("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const { password } = req.body;

  if (postId.match(/^[0-9a-fA-F]{24}$/)) {
    const thisPost = await Post.findOne({ _id: postId });

    if (thisPost === null) {
      res.status(400).json({ message: "해당 게시물을 찾을 수 없습니다." });
    } else {
      if (Number(password) === thisPost.password) {
        await Post.deleteOne({ _id: postId });
        res.json({ message: "게시글을 삭제하였습니다." });
      } else {
        res.status(400).json({ message: "비밀번호가 맞지 않습니다." });
      }
    }
  } else {
    res.status(400).json({ message: "id 형식이 맞지 않습니다." });
  }
});

module.exports = router;
