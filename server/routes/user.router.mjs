import express from 'express';
import { getUser } from "../controller/user.controller.mjs";

const router = express.Router();

router.get('/:id', getUser);

export default router;
