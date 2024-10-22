import express from 'express';
import { User } from '../db/db.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
const router=express.Router();


router.use(cookieParser());
router.get('/repos',async(req,res)=>{
   //Send Out The repos that you are following
   const user_id=req.cookies.token;
   console.log(user_id)
   try{
      jwt.verify(user_id,process.env.JWT_SECRET_PASSWORD);
      
   }catch(err){
      console.log("Cannot access User_ID");
      return res.status(400).json({message:"Lost User Will have to relogin"})
   }
   const username=jwt.decode(user_id);
   const user_data= await User.findOne({'username':username});

   res.json({message:"this is repos  page",repos:user_data.repos})
})

router.post('/signup',async(req,res)=>{
     //add auth logic 
     const {username}=req.body;
     const user_id=jwt.sign(username,process.env.JWT_SECRET_PASSWORD)
     const repos=[];
     const user=new User({username,repos});
     try{
      await user.save();
     }catch(err){
      console.error(err);
     }
     res.cookie("token",user_id,{httpOnly:true,secure:true});
     res.json({message:"Written successful"})    
})
router.post('/add',async(req,res)=>{
   const user_id=req.cookies.token;
   
   try{
      jwt.verify(user_id,process.env.JWT_SECRET_PASSWORD);
      
   }catch(err){
      console.log("Cannot access User_ID");
      return res.status(400).json({message:"Lost User Will have to relogin"})
   }
   const new_repo=req.body.repos;
   const username=jwt.decode(user_id);
   const user_data= await User.findOne({'username':username});
   user_data.repos.push(new_repo);
   try{
      await user_data.save();
      res.json({message:"Repo added scucesfully"});
   }catch(err){
      res.status(404).json({message:"Cannot write"});
   }

})
export {router}