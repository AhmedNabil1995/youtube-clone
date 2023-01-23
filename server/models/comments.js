import mongoose from "mongoose";

const commentSchema  = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},
    video:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Video'},
    text : {type:String,required:true},
},{timestamps:true});


export default mongoose.model('Comment',commentSchema);