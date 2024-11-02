import { mongoose,Schema} from 'mongoose';
const MONGO_URL=process.env.MONGO_URL || "mongodb://localhost:27017/Users";
mongoose.connect(MONGO_URL).catch(error=>console.log(error));
console.log("Db Connected Succesfully");
const userSchema=new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        select:false //Hides from queries
    },
    repos:[String]
    
})

export const User=mongoose.model('User',userSchema);
 