const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postController");
const isAuth = require("../middlewares/isAuth");

router.get("/", postsController.getPosts);
router.post("/create-post", isAuth, postsController.createPost);
router.post("/update-post", isAuth, postsController.updatePost);
router.post("/delete-post", isAuth, postsController.deletePost);
router.post("/like-post", isAuth, postsController.likePost);
module.exports = router;
