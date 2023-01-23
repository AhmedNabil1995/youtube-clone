import express from 'express';
import { verify } from '../middleware/verifyToken.js';
import { deleteUser, dislikeVideo, getUser, likeVideo, subscribe, unsubscribe, updateUser } from '../controlers/user.js';

const router = express.Router();


router.put('/:id',verify,updateUser)

router.delete('/:id',verify,deleteUser)

router.get('/:id',getUser)

router.put('/subscribe/:chanalId',verify,subscribe)

router.put('/unsubscribe/:chanalId',verify,unsubscribe)

router.put('/like/:videoId',verify,likeVideo)

router.put('/dislike/:videoId',verify,dislikeVideo)

export default router;