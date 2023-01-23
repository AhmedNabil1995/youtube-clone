import CommentModel from '../models/comments.js';
import VideoModel from '../models/video.js';

export const addComment = async (req,res,next)=>{
    try {
        const comment = new CommentModel({...req.body,user:req.user.id});
        const savedComment = await comment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        next(err)
    }
}

export const deleteComment = async (req,res,next)=>{
    try {
        const comment = await CommentModel.findById(req.params.id);
        const video = await VideoModel.findById(comment.video);
        if(comment.user===req.user.id ||req.user.id ==video.user ){

            await CommentModel.findByIdAndDelete(req.params.id);
            res.status(200).json('The comment has been deleted.')
        }
    } catch (err) {
        next(err)
    }
}

export const getComments = async (req,res,next)=>{
    try {
        const comment = await CommentModel.find({video:req.params.videoId}).sort({createdAt:-1}).populate('user');
        res.status(200).json(comment)
    } catch (err) {
        next(err)
    }
}