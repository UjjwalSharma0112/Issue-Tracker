import express from 'express'
import dotenv from 'dotenv'
import { router } from './routes/user.js';



dotenv.config();

const app=express();

const userRouter=router

app.use(express.json());
app.use('/users',userRouter)

const PORT=process.env.PORT||3000
app.listen(PORT,()=>{

    console.log(`Server Running on port ${PORT}`)
})