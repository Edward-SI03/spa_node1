const express = require("express");
const router = express.Router();
// const Post = require("../schemas/post");
const { Post, Like } = require("../models");
const loginMiddleware = require("../middleware/login-middleware");

// 게시물 조회
router.get("/", async (req, res) => {
  let datas = await Post.findAll(
    { order: [["createdAt", "DESC"]] }
  );
  console.log(datas)

  // 좋아요 누를때 likes의 카운트를 +-1 안해도, 
  // Like테이블에서 좋아요 게시물을 배열로 만들어 요소의 갯수만큼 likes를 표시
  // const likeCount = datas.map((e) => {
  //   return Like.findAll({ where: { postId: e.postId } });
  // });
  // // console.log(likeCount);

  // Promise.all(likeCount).then((value) => {
  //   // console.log(value);

  //   res.json({
  //     data: datas.map((e, i) => {
  //       return {
  //         postId: e.postId,
  //         userId: e.userId,
  //         nickname: e.nickname,
  //         title: e.title,
  //         createdAt: e.createdAt,
  //         updatedAt: e.updatedAt,
  //         likes: value[i].length,
  //       };
  //     }),
  //   });
  // });

  // 좋아요 누를때 likes의 카운트를 +-1 씩 해서 맞춤
  // 내가 좋아요 누른 게시물 보여줄때 또 배열돌려서 좋아요 갯수 보여주기 힘들어서 이 방법 선택함
  res.json({
    data: datas.map((e) => {
      return {
        postId: e.postId,
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
router.get("/:postId", async (req, res, next) => {
  const postId = req.params.postId;

  if (postId === "like") {
    next();
    return;
  }

  if (postId.match(/^[0-9]$/)) {
    const datas = await Post.findOne(
      { where: { postId } }
      // { __v: false, password: false }
    );

    if (datas === null) {
      res.status(400).json({ message: "해당 게시물을 찾을 수 없습니다." });
      return;
    } else {
      // const likeCount = await Like.findAll({ where: { postId } });
      res.json({
        data: {
          postId: datas.postId,
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
  // const createdAt = new Date();
  // const updatedAt = new Date();
  const likes = 0;
  // const likeUsers = [];

  const createPost = await Post.create({
    userId: user.userId,
    nickname: user.nickname,
    title,
    content,
    // createdAt,
    // updatedAt,
    // likeUsers,
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
  // const updatedAt = new Date();

  // object 형식 유효성검사
  // if (postId.match(/^[0-9a-fA-F]{24}$/)) {
  if (postId.match(/^[0-9]$/)) {
    const thisPost = await Post.findOne({ where: { postId } });

    if (thisPost === null) {
      res.status(400).json({ message: "해당 게시물을 찾을 수 없습니다." });
      return;
    } else {
      if (user.userId.toString() === thisPost.userId) {
        await Post.update(
          { title, content },
          { where: { postId } }
          // { $set: { title, content, updatedAt } }
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

  if (postId.match(/^[0-9]$/)) {
    const thisPost = await Post.findOne({ where: { postId } });

    if (thisPost === null) {
      res.status(400).json({ message: "해당 게시물을 찾을 수 없습니다." });
      return;
    } else {
      if (user.userId.toString() === thisPost.userId) {
        await Post.destroy({ where: { postId } });
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
