import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controller/post.controller.mjs";

const router = express.Router();

router.post('/', createPost);

export default router;
