import express from 'express';
import {verify} from '../middleware/verifyToken.js';
import { addVideo, deleteVideo, getByTags, getVideo, increaseView, randomVideos, search, sub, trendVideos, updateVideo } from '../controlers/video.js';


const router = express.Router();

router.post('/',verify,addVideo);

router.put('/:id',verify,updateVideo);

router.delete('/:id',verify,deleteVideo)

router.get('/find/:id',getVideo);

router.put('/',increaseView);

router.get('/random',randomVideos)

router.get('/trend',trendVideos)

router.get('/sub',verify,sub)

router.get('/related/',getByTags);

router.get('/search',search)

export default router;