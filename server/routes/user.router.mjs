import express from 'express';
import { getUser, updateProfile } from "../controller/user.controller.mjs";

const router = express.Router();

router.get('/:id', getUser);
router.patch('/:id', updateProfile);


export default router;
