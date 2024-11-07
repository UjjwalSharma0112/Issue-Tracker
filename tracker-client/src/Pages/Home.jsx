import React, { useEffect, useState } from 'react';
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
    const [repoData,setRepoData]=useState([{}]);
    const [api,setApi]=useState([]);
    const [error,setError]=useState('');
    const getRepos =  () => {
        try {
             axios.get("http://localhost:3000/users/repos", { withCredentials: true }).then((res)=>{
                setRepoData(res.data.repo);
             });
            // Access the data property directly
        } catch (error) {
            console.error("Error fetching data:", error); // Handle any errors
        }
    };
    useEffect(()=>{
       const getData=setTimeout(getRepos,1000);
       return ()=>clearTimeout(getData)
    },[repos]);
 
    const postRepos=()=>{
        try{
            const result=ReposSchema.safeParse({repo:repos});
           
            if(!result.success){
                setError(result.error.issues[0].message);
                return
            }
            setError('');
            axios.post("http://localhost:3000/users/add",{repos:repos},{withCredentials:true}).then((res)=>{
                console.log(res.data.message);
                setRepos('');
            })
        }catch(error){
            console.log(error);

        }
    }
 
    useEffect(() => {
        const apiUrls = repoData.map((data) => data.githubApiUrl);
        setApi(apiUrls);
    }, [repoData]);
    return (
        <>
        <div className='min-h-screen bg-zinc-900 flex items-center justify-center p-4'>
         <div className='p-12 rounded-lg shadow-lg w-full max-w-2xl min-h-[600px] flex flex-col items-start bg-zinc-800'>
             <div className='w-full'>
                 <InputBar field="Repo Url" onChange={setRepos}/>
                {<p className='text-red-500'>{error}</p>}
            </div>
             
           
              <Button field="Add Repo" onClick={postRepos} />
             </div>
             <div className='w-full mt-4'>
                    <h3 className="text-xl text-white font-semibold mb-2">Repositories:</h3>
                    <ul className='space-y-2'>
                        {api.map((repo, index) => (
                            <li key={index} className='text-white bg-zinc-700 p-2 rounded'>
                                {repo}
                            </li>
                        ))}
                    </ul>
                </div>

        </div>
       
        </>
    );
}
