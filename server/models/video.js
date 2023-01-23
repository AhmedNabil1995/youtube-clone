import mongoose from "mongoose";

const videoSchema  = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},
    title : {type:String,required:true},
    likes:{type:[String]},
    dislikes:{type:[String]},
    views:{type:Number,default:0},
    thumbnail:{type:String},
    videourl :{type:String},
    tags:{type:[String]}
},{timestamps:true});


export default mongoose.model('Video',videoSchema);