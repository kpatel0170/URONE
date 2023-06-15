import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  getPostsByUserId,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  addComment,
} from "../controller/post.controller.mjs";

const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.get('/user/:userId', getPostsByUserId);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/like', likePost);
router.patch('/:id/dislike', dislikePost);
router.post('/:id/comment', addComment);

export default router;
