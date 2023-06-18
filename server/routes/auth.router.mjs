import express from "express";
import { registerUser, loginUser } from "../controller/auth.controller.mjs";

const router = express.Router()

/**
 * Registers the route for user registration.
 * @name POST /api/v1/auth/register
 */
router.post('/register', registerUser);

/**
 * Registers the route for user login.
 * @name POST /api/v1/auth/login
 */
router.post('/login', loginUser);


export default router