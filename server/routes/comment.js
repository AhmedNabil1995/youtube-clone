import express from 'express';
import { addComment, deleteComment, getComments } from '../controlers/comment.js';
import {verify} from '../middleware/verifyToken.js';


const router = express.Router();

router.post('/',verify,addComment)

router.delete('/:id',verify,deleteComment)

router.get('/:videoId',getComments)

export default router
