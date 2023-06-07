import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  rmlikePost,
  dislikePost,
  rmdislikePost,
  addComment,
} from "../controller/post.controller.mjs";

const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/like', likePost);
router.delete('/:id/like', rmlikePost);
router.post('/:id/dislike', dislikePost);
router.delete('/:id/dislike', rmdislikePost);
router.post('/:id/comment', addComment);

export default router;
