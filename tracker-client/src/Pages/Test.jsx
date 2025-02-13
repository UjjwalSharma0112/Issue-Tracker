import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Test(){
      const [repos,setRepoData]=useState('');
      const [res,setRes]=useState(false);
      const [json,setJson]=useState({});
      useEffect(()=>{
            axios.get('http://localhost:3000/users/repos',{withCredentials:true}).then((res)=>{
                  setRepoData(res.data.repo);
                  setRes(true);
            })
      
      },[])

      if(res){
            repos.forEach(element => {
                  let url=element.githubApiUrl;
                  axios.get(`${url}/issues`).then((res)=>{
                        res.data.forEach(element => {
                              let json={
                                    githubApiUrl:url,
                                    number:element.number,
                                    created_at:element.created_at,
                                    state:element.state,
                                    title:element.title,
                                    updated_at:element.updated_at
                              }      
                              console.log(json)
                        });
                        
                        
                        
                  })
                  console.log(`${url}`)      
            });
            
      }
      
      return <>
            
      </>
}