import express from 'express'
import dotenv from 'dotenv'
import  userRouter  from './routes/user.js';
import cors from 'cors';
import testRouter from './routes/test.js'


dotenv.config();

const app=express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use('/users',userRouter);
app.use('/test',testRouter);

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{

    console.log(`Server Running on port ${PORT}`)
})