import express from 'express';
const router=express.Router();



router.get('/repos',(req,res)=>{
   //Send Out The repos that you are following 
   res.json({message:"this is repos  page"})
})

router.post('/add',(req,res)=>{
     const ans=req.body;
     res.json(ans)    
})

export {router}