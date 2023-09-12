const express = require("express");
const router = express.Router();
const { createPost, updatePost, deletePost, getAllPosts, getPost } = require("../controllers/postController.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");

router.route("/create").post(isLoggedIn, createPost);
router.route("/getPost").get(getAllPosts);
router.route("/getPost/:id").get(getPost);
router.route("/update/:id").put(isLoggedIn, updatePost);
router.route("/delete/:id").delete(isLoggedIn, deletePost);

module.exports = router;