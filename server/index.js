import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import videoRouter from './routes/video.js';
import commentRouter from './routes/comment.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();


app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.use('/auth',authRouter);
app.use('/users',userRouter);
app.use('/videos',videoRouter);
app.use('/comments',commentRouter);

//err middleware
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "something went wrong!";
    res.status(status).json({success:false,message,status})
})

mongoose.connect(process.env.DB_CONNECTION,()=>{
    console.log(`connected to database successfully`);
})

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})