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
    const inputFields=[ <div key="username">
                           <InputBar field="username" onChange={setUsername}/>
                            {<p className="text-red-500">{error.username}</p>}
                        </div> ,
                        <div key="email">
                            <InputBar key="email" field="email" onChange={setEmail}/>
                            { <p className="text-red-500">{error.email}</p>}
                        </div>,
                        <div key="password">
                            <InputBar key="password" field="password" onChange={setPassword}/>
                            { <p className="text-red-500">{error.password}</p>}
                        </div>
                    ]
  
    return(<>
    <div className="min-h-screen  bg-zinc-900 flex  items-center justify-center">   
         {inputFields.map((items)=>
            items
         )}
        <Button field="Sign Up" onClick={sendRequest}/> 
        
    </div>
    
    </>)
}

