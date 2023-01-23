import {createError} from '../error.js'
import jwt from 'jsonwebtoken';

export const verify = (req,res,next)=>{
    let token = req.headers.access_token;
    if(!token) return next(createError(401,'you are not authentcated'));

     jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
        if(err) return next(createError(403,'token is not valid'));
        req.user = user;
        next();
     });
}