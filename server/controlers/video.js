import VideoModel from '../models/video.js';
import { createError } from '../error.js';
import UserModel from '../models/user.js';

export const addVideo = async(req,res,next)=>{
    try {
        console.log(req.body)
        let video = new VideoModel({user:req.user.id,...req.body});
        let savedVideo = await video.save();
        res.status(200).json(savedVideo)
    } catch (err) {
        next(err);
    }
}

export const updateVideo = async(req,res,next)=>{
    try {
       let video = await VideoModel.findById(req.params.id);
       if(!video) return next(createError(404,'video not found'));
       if(video.user === req.user.id ){
        let updatedVideo = await video.update({$set:req.body},{new:true});
        res.status(200).json(updatedVideo);
       }else{
        next(createError(403,'you are not allowed to update this video'))
       }
    } catch (err) {
        next(err);
    }
}

export const deleteVideo = async(req,res,next)=>{
    try {
       let video = await VideoModel.findById(req.params.id);
       if(!video) return next(createError(404,'video not found'));
       if(video.user === req.user.id ){
        let deletedVideo = await VideoModel.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedVideo);
       }else{
        next(createError(403,'you are not allowed to update this video'))
       }
    } catch (err) {
        next(err);
    }
}

export const getVideo = async(req,res,next)=>{
    try {
       let video = await VideoModel.findById(req.params.id).populate('user');
       if(!video) return next(createError(404,'video not found'));
       res.status(200).json(video);
    } catch (err) {
        next(err);
    }
} 

export const increaseView = async(req,res,next)=>{
    try {
       await VideoModel.findByIdAndUpdate(req.params.id,{$inc:{views:1}});
       res.status(200).json('views has been increased');
    } catch (err) {
        next(err);
    }
}

export const randomVideos = async(req,res,next)=>{
    try {
       let videos = await VideoModel.aggregate([{$sample:{size:30}},{$lookup:{from:'users',localField:"user",foreignField:"_id",as:"user"}}]);
       videos = videos.map(video=>{
        return {...video,user:video.user[0]}
       })
       res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export const trendVideos = async(req,res,next)=>{
    try {
       let videos = await VideoModel.find({}).populate('user');
       res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export const sub = async(req,res,next)=>{
    try {
       let user = await UserModel.findById(req.user.id);
       let subscribing = user.subscribing;

       if(!subscribing) return res.status(200).json([]);
      let videos = await Promise.all(
            subscribing.map(async(userId)=>{
                return await VideoModel.find({user:userId}).populate('user')
            })
       )
       res.status(200).json(videos.flat().sort((a,b)=>b.createdAt-a.createdAt))
    } catch (err) {
        next(err);
    }
}

export const getByTags = async(req,res,next)=>{
    let tags = req.query.tags;
    try {
       let videos = await VideoModel.find({tags:{$in:tags}}).populate('user').limit(20);
       res.status(200).json(videos)
    } catch (err) {
        next(err);
    }
}

export const search = async(req,res,next)=>{
    let q = req.query.q;
    try {
       let videos = VideoModel.find({title:{$regex:q,$option:"i"}}).limit(30);
       res.status(200).json(videos)
    } catch (err) {
        next(err);
    }
}