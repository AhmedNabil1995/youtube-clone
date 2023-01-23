import  jwt  from 'jsonwebtoken';
import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';
import { createError } from '../error.js';

export const register = async (req,res,next)=>{
        let {name,email} = req.body;
        try {
            const oldUser = await UserModel.findOne({email});
            if(oldUser) return res.status(400).json('you already has an acount.');

            let salt =  bcrypt.genSaltSync(10);
            let hashPassword =  bcrypt.hashSync(req.body.password,salt);

            const user = new UserModel({name,email,password:hashPassword});
            
            let newUser = await user.save();
            console.log('register 3');

            let {password,...other} = newUser;
            res.status(200).json(other._doc);
            
        } catch (err) {
            res.status(500).json(err);
        }


}

export const login = async(req,res,next)=>{
    let {password,email} = req.body;
        try{
            const oldUser = await UserModel.findOne({email});
            if(!oldUser) return next(createError(400,'user not found'));
            
            if(bcrypt.compareSync(password,oldUser.password)){
                let token = jwt.sign({id:oldUser._id},process.env.JWT_KEY);
                let {password,...other} = oldUser._doc;
                res.cookie('access_token',token).status(200).json(other);
            }else{
                 return next(createError(400,'password is wrong'));
            }
    
        }catch(err){
            next(err);
        }
    }

export const googleauth = async (req,res,next)=>{
      try {
        let olduser=  await UserModel.findOne({email:req.body.email});

        if(olduser){
           const token = jwt.sign({id:olduser._id},process.env.JWT_KEY);
           res.cookie("access_token",token,{httpOnly:true})
           .status(200).json({...olduser._doc,token})
        }else{
            let user = new UserModel(req.body);
            let savedUser =  await user.save()
            const token = jwt.sign({id:savedUser._id},process.env.JWT_KEY);
           res.cookie("access_token",token,{httpOnly:true})
           .status(200).json({...savedUser._doc,token})
        }
      } catch (err) {
        next(err);
      }
}