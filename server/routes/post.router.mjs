import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost
} from "../controller/post.controller.mjs";

const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', updatePost);

export default router;
