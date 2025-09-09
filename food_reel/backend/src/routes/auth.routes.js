import express from 'express';
import { registerUser } from '../controllers/auth.controller.js';

export const router = express();

router.post("/users/register", registerUser);

