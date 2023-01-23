import UserModel from '../models/user.js';
import VideoModel from '../models/video.js';

export const updateUser = async(req,res,next)=>{
    if(req.user.id===req.params.id){
       
        try {
            let updatedUser = await UserModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err)
        }
    
    }else{
        next(createError(403,'you can only update your acount'))
    }
    }

export const deleteUser = async(req,res,next)=>{
    if(req.user.id===req.params.id){
       
        try {
            await UserModel.findByIdAndDelete(req.params.id);
            res.status(200).json("user has been deleted");
        } catch (err) {
            next(err)
        }
    
    }else{
        next(createError(403,'you can only delete your acount'))
    }
    }

export const getUser = async(req,res,next)=>{
    try {
        let user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}

export const subscribe = async (req,res,next)=>{
    try {
        await UserModel.findByIdAndUpdate(req.user.id,
            {$addToSet:{subscribing:req.params.chanalId}});

        await UserModel.findByIdAndUpdate(req.params.chanalId,
                {$inc:{subscribers:1}})

        res.status(200).json("Subscription successfull.");
    } catch (err) {
        next(err)
    }
}

export const unsubscribe = async (req,res,next)=>{
    try {
        await UserModel.findByIdAndUpdate(req.user.id,
            {$pull:{subscribing:req.params.chanalId}});

        await UserModel.findByIdAndUpdate(req.params.chanalId,
                {$inc:{subscribers:-1}})

        res.status(200).json("unSubscription successfull.");
    } catch (err) {
        next(err)
    }
}

export const likeVideo = async (req,res,next)=>{
    let userId = req.user.id;
    let videoId = req.params.videoId;
    try {
        await VideoModel.findByIdAndUpdate(videoId,
            {$addToSet:{likes:userId},$pull:{dislikes:userId}});


        res.status(200).json("the video has been liked");
    } catch (err) {
        next(err)
    }
}

export const dislikeVideo = async (req,res,next)=>{
    let userId = req.user.id;
    let videoId = req.params.videoId;
    try {
        await VideoModel.findByIdAndUpdate(videoId,
            {$addToSet:{dislikes:userId},$pull:{likes:userId}});


        res.status(200).json("the video has been liked");
    } catch (err) {
        next(err)
    }
}