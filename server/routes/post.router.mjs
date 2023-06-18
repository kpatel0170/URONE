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

/**
 * Registers the route for creating a new post.
 * @name POST /api/v1/posts/
 */
router.post('/', createPost);

/**
 * Registers the route for retrieving all posts.
 * @name GET /api/v1/posts/
 */
router.get('/', getPosts);

/**
 * Registers the route for retrieving a post by ID.
 * @name GET /api/v1/posts/:id
 */
router.get('/:id', getPostById);

/**
 * Registers the route for retrieving posts by user ID.
 * @name GET /api/v1/posts/user/:userId
 */
router.get('/user/:userId', getPostsByUserId);

/**
 * Registers the route for updating a post.
 * @name PATCH /api/v1/posts/:id
 */
router.patch('/:id', updatePost);

/**
 * Registers the route for deleting a post.
 * @name DELETE /api/v1/posts/:id
 */
router.delete('/:id', deletePost);

/**
 * Registers the route for liking a post.
 * @name PATCH /api/v1/posts/:id/like
 */
router.patch('/:id/like', likePost);

/**
 * Registers the route for disliking a post.
 * @name PATCH /api/v1/posts/:id/dislike
 */
router.patch('/:id/dislike', dislikePost);

/**
 * Registers the route for adding a comment to a post.
 * @name POST /api/v1/posts/:id/comment
 */
router.post('/:id/comment', addComment);

export default router;
