import { mongoose,Schema} from 'mongoose';
const MONGO_URL=process.env.MONGO_URL || "mongodb://localhost:27017/Users";
mongoose.connect(MONGO_URL).then(()=>{
    console.log("Db Connected Succesfully");
}).catch(error=>console.log(error));
const issueSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    state: {
        type: String,
        enum: ['open', 'closed'], // Assuming the state can only be 'open' or 'closed'
        required: true
    },
    title: {
        type: String,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    }
});
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
    repos:[{
        githubUrl:String,
        githubApiUrl:String,
        issues:{
            type:[issueSchema],default:[]}
    }]
    
})

export const User=mongoose.model('User',userSchema);
 