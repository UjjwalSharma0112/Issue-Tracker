import jwt from 'jsonwebtoken';
export default function Authorization(req,res,next){
const userId=req.cookies.token;

if(!userId){
   return res.status(401).json({message:"Unauthorized access"})
}
try{
   jwt.verify(userId,process.env.JWT_SECRET_PASSWORD);
   next();  
}catch(err){
   res.status(401).json({message:"Invalid Token"})
}
}