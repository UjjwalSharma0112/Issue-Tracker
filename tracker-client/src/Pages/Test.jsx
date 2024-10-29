import { useState } from "react";
import InputBar from "../Components/InputBar.jsx";
import Button from "../Components/Button.jsx";
import axios from "axios";

export default function Test(){
    
      const [username,setUsername]=useState('');
      const [repos,setRepos]=useState('');
      const [res,setRes]=useState('');
      const sendData=()=>{
            axios.post('http://localhost:3000/test/',{username,repos}).then((response)=>{
                  setRes(response);
            }).catch((error)=>console.log(error));
         
      }
      return <>
      <InputBar field="username" setData={setUsername}/>
      <InputBar field="repos" setData={setRepos}/>
      {username},
      {repos}
     <Button field="Submit" onClick={sendData}/>
     {JSON.stringify(res)}
      </>
      
    
}