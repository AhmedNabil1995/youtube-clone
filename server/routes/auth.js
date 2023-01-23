import express from 'express';

import { googleauth, login, register } from '../controlers/auth.js';

const router = express.Router();

router.post('/register',register)

router.post('/login',login)

router.post('/googleauth',googleauth)

export default router;