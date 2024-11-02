import express from 'express';
import { User } from '../db/db.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { ReposSchema, UserLogin, UserSchema } from '../middleware/schema.js';
import bcrypt from 'bcrypt';
import Authorization from '../middleware/auth.js';
import axios from 'axios';
const router=express.Router();

/*notes:
  rate limiting would be an issue in the future: 
  Solutions: 
  1 Caching The repos 
*/  
/*
TODO 
1.Delete Repo
2.Delete User
3.Logouts
*/
router.use(cookieParser());
router.get('/',Authorization,(req,res)=>{

   return res.status(200).json({message:"Welcome User"});
})

router.post('/signup',async(req,res)=>{
   
   const {username,email,password}=req.body;
   const result=UserSchema.safeParse({username,email,password});
   if(!result.success){
      return res.status(400).json({message:"Invalid Input",errors:result.error.errors});
   }
   //check for the user if present in the database using his email
   const isExisting=await User.findOne({$or:[{'email':email},{'username':username}]})
   if(isExisting==null){
      

      const user_id=jwt.sign(username,process.env.JWT_SECRET_PASSWORD);
      const hash_password=await bcrypt.hash(password,10);
      const repos=[];
      const user=new User({username,email,password:hash_password,repos});
      try{
         await user.save();
         res.cookie("token",user_id,{httpOnly:true,secure:true});
         res.status(200).json({message:"Written successful"}) //signing cookies
       }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal Server Error"});
    }
    

   }
   else{
      return res.status(409).json({conflict:"User Exists Already Sign In"})
   }

   
})

router.post('/signin',async(req,res)=>{
   
   if(!req.cookies.token){
      const {email,password}=req.body;
      const result=UserLogin.safeParse({email,password})
      if(!result.success){
         return res.status(401).json({message:"Invalid Input",error:result.error.errors});
      }
      const user=await User.findOne({email}).select("+password");
      if(user===null){
         return res.status(404).json({message:"User Doesn't Exist Sign Up"})
      }
      
      const match =await bcrypt.compare(password,user.password);
      if(match==true){
      
         const user_id=jwt.sign(user.username,process.env.JWT_SECRET_PASSWORD);
         res.cookie("token",user_id,{httpOnly:true,secure:true});//signing cookies
         res.json({message:"Login Successful"}) 
      }
      else{
         return res.status(401).json({message:"Unauthorized Acces"})
      }
   }
   else{
      return res.status(400).json({message:"Already logged in"})
   }
})


router.get('/repos',Authorization,async(req,res)=>{
   //Send Out The repos that you are following
   const token=req.cookies.token;
   const username=jwt.decode(token);
   const user=await User.findOne({'username':username});
   res.status(200).json({repo:user.repos});
})


router.post('/add',Authorization,async(req,res)=>{
   
   const new_repo=req.body.repos;
   const result=ReposSchema.safeParse({repo:new_repo});
   if(!result.success){
      return res.status(401).json({message:"Invalid Input",error:result.error.errors});
   }
   //to do parsing the new repo 
   let owner, repo;
   try {
       const url = new URL(new_repo);
       const pathParts = url.pathname.split('/').filter(Boolean);
       if (pathParts.length >= 1) {
           owner = pathParts[0]; 
           repo=pathParts[1];
           if (repo.endsWith('.git')) {
               repo = repo.slice(0, -4);
           }
       } else {
           return res.status(400).json({ message: "Invalid GitHub repository URL" });
       }
   } catch (err) {
       return res.status(400).json({ message: "Invalid GitHub repository URL", error: err.message });
   }

   
   const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}`; // Replace with the correct owner and repo

   try {
       const response = await axios.get(githubApiUrl);
   // dont know if this is best practice or should i just ping it ?    
   } catch (err) {
       if (err.response && err.response.status === 404) {
           return res.status(404).json({ message: "Repo not found" });
       }
       return res.status(500).json({ message: "Error checking repo", error: err.message });
   }
   
   const token=req.cookies.token;
   const username=jwt.decode(token);
   const user= await User.findOne({'username':username});
   
   user.repos.push(githubApiUrl);
   try{
      await user.save();
      res.json({message:"Repo added scucesfully"});
   }catch(err){
      res.status(404).json({message:"Cannot write"});
   }

})
export default router;