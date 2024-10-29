import express from 'express';
import { ReposSchema, UserSchema } from '../middleware/schema.js';

const router = express.Router();

router.post('/', (req, res) => {
    const userData = req.body;

    const result = UserSchema.safeParse(userData);
    
    if (!result.success) {
        return res.status(400).json({ message: "Incorrect inputs", errors: result.error.errors });
    }

    const { email } = result.data; // Extract validated email from the parsed result

    res.json({
        message: `Hello ${email}`
    });
});
router.post('/repo',(req,res)=>{
    const {repo}=req.body;
    const result=ReposSchema.safeParse({repo});
    if(!result.success){
        return res.status(400).json({message:"Incorrect Inputs",errors:result.error.errors});
    }
    res.json({
        message:`Added ${repo}`
    })
})
export default router;
