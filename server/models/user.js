import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    name : {type:String,required:true},
    email: {type:String,unique:true,required:true},
    password: {type:String},
    image: {type:String},
    subscribers:{type:Number,default:0},
    subscribing:{type:[String]},
},{timestamps:true});


export default mongoose.model('User',userSchema);