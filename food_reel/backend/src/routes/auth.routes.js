import express from 'express';
import { registerUser,loginUser } from '../controllers/auth.controller.js';

export const router = express();

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

