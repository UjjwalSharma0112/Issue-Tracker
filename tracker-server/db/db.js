import { mongoose,Schema} from 'mongoose';

mongoose.connect("mongodb://localhost:27017/Users").
catch(error=>console.log(error));

const userSchema=new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    repos:[String]
    
})

export const User=mongoose.model('User',userSchema);
 