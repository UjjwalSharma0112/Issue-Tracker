import React, { useState } from 'react';
import axios from 'axios';
import Button from '../Components/Button';
import InputBar from '../Components/InputBar';
import {z} from 'zod'
const isRepo = (repo) => {
    const url = 'https://github.com/';
    return repo.startsWith(url);
};

const GithubRepo = z.string().refine(isRepo, {
    message: "Invalid GitHub repository URL",
});

const ReposSchema = z.object({
    repo: GithubRepo
});


export default function Home() {
    const [repos,setRepos]=useState('');
    const [error,setError]=useState('');
    const getRepos =  () => {
        try {
             axios.get("http://localhost:3000/users/repos", { withCredentials: true }).then((res)=>{
                console.log(res.data);
             });
            // Access the data property directly
        } catch (error) {
            console.error("Error fetching data:", error); // Handle any errors
        }
    };
    const postRepos=()=>{
        try{
            const result=ReposSchema.safeParse({repo:repos});
           
            if(!result.success){
                setError(result.error.issues[0].message);
                return
            }
            setError('');
            axios.post("http://localhost:3000/users/add",{repos:repos},{withCredentials:true}).then((res)=>{
                console.log("repos added succesfully");
            })
        }catch(error){
            console.log(error);

        }
    }

    return (
        <>
        <div className='min-h-screen  bg-zinc-900 flex  items-center justify-center'>
            <div>
                <InputBar field="Repo Url" onChange={setRepos}/>
                {<p className='text-red-500'>{error}</p>}
            </div>
            <Button field="GEt repos " onClick={getRepos}></Button>
            
            <Button field="Add Repo" onClick={postRepos} />
        </div>
            
        </>
    );
}
