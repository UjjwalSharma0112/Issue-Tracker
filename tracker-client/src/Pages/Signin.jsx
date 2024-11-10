import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputBar from "../Components/InputBar";
import Button from "../Components/Button";
import {z} from 'zod';
import axios from 'axios';
const UserLogin=z.object({
    email:z.string().email(),
    password:z.string()
})
export default function Signin(){
      
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
    
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [error,setError]=useState({username:'',email:'',password:''});

    const sendRequest=()=>{
        try{
            const result=UserLogin.safeParse({email,password});
            if(!result.success){
                const newError={email:'',password:''};
                const issues=result.error.issues
                issues.forEach((issue)=>{
                    const field=issue.path[0];
                    newError[field]=issue.message;
                })
                setError(newError);
                return 
            }
            setError({  email: '', password: '' });
            axios.post("http://localhost:3000/users/signin",{email,password},{withCredentials:true}).then((res)=>{
                if(res.status==200){
                    navigate('/home');
                }
            })    
        }catch(err){}
        
    }

    const inputFields = [
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
            <h1   className="text-6xl font-sans font-bold text-center w-full  text-white mb-6 ">Sign In</h1>
            <div className="flex flex-col  justify-center w-full max-w-2xl pt-12">
                {inputFields.map((item) => item)}
                <div className="pt-12">
                 <Button field="Sign Up" onClick={sendRequest} />
                </div>    
            </div>
            <div className="flex justify-center items-center w-full pt-8">
            <div className="flex-grow h-px bg-gray-400"></div>
             <a href="/" className="text-gray-400 p-4">Don't have an account  Sign Up</a>
             <div className="flex-grow h-px bg-gray-400"></div>
            </div>
            
            
        </div>
    </div>

    );
}