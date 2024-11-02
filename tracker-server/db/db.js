import { mongoose,Schema} from 'mongoose';
const MONGO_URL=process.env.MONGO_URL || "mongodb://localhost:27017/Users";
mongoose.connect(MONGO_URL).then(()=>{
    console.log("Db Connected Succesfully");
}).catch(error=>console.log(error));

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
 