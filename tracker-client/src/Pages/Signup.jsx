import { useEffect, useState } from "react";
import InputBar from "../Components/InputBar";
import Button from "../Components/Button";
import axios from 'axios';
import { z } from 'zod';
import { useNavigate } from "react-router-dom";

const UserSchema = z.object({
    username:z.string().min(4,{message:"Required Field Must Be Filled"}),
    email: z.string().email({message:"Required Field Must Be Filled"}),
    password: z.string().min(8,{message:"Mininum 8 letter Word"})
});
export default function Signup(){
    
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:3000/users/", { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    navigate('/home');
                }
                else{
                    console.log("Unauthorized User")
                }
            })
            .catch((error) => {
            
            });
    },[])



    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [error,setError]=useState({username:'',email:'',password:''});
    const sendRequest=()=>{
        try{
            const result=UserSchema.safeParse({username,email,password});
            if(!result.success){
                const newError={username:'',email:'',password:''};
                const issues=result.error.issues
                issues.forEach((issue)=>{
                    const field=issue.path[0];
                    newError[field]=issue.message;
                })
                setError(newError);
                return 
            }
            setError({ username: '', email: '', password: '' });
            axios.post("http://localhost:3000/users/signup",{username,email,password},{withCredentials:true}).then((res)=>{
                if(res.status==200){
                    navigate('/home');
                }
            })    
        }catch(err){}
        
    }
    const inputFields = [
        <div key="username" className="mb-4">
            <InputBar field="username" onChange={setUsername} />
            {<p className="text-red-500 text-sm mt-1">{error.username}</p>}
        </div>,
        <div key="email" className="mb-4">
            <InputBar field="email" onChange={setEmail} />
            {<p className="text-red-500 text-sm mt-1">{error.email}</p>}
        </div>,
        <div key="password" className="mb-6">
            <InputBar field="password" onChange={setPassword} />
            {<p className="text-red-500 text-sm mt-1">{error.password}</p>}
        </div>
    ];

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
        <div className="bg-zinc-800 p-12 rounded-lg shadow-lg w-full max-w-2xl min-h-[600px] flex flex-col items-start">
            <h1   className="text-6xl font-sans font-bold text-center w-full  text-white mb-6 ">Sign Up</h1>
            <div className="flex flex-col  justify-center w-full max-w-2xl pt-12">
                {inputFields.map((item) => item)}
                <div className="pt-12">
                 <Button field="Sign Up" onClick={sendRequest} />
                </div>    
            </div>
            <div className="flex justify-center items-center w-full pt-8">
            <div className="flex-grow h-px bg-gray-400"></div>
             <a href="/signin" className="text-gray-400 p-4">Already have an account  Sign In</a>
             <div className="flex-grow h-px bg-gray-400"></div>
            </div>
            
            
        </div>
    </div>

    );
}