import express from 'express';
import { getUser, updateProfile } from "../controller/user.controller.mjs";

const router = express.Router();

/**
 * Registers the route for retrieving a user by ID.
 * @name GET /api/v1/users/:id
 */
router.get('/:id', getUser);

/**
 * Registers the route for updating a user's profile.
 * @name PATCH /api/v1/users/:id
 */
router.patch('/:id', updateProfile);

export default router;
