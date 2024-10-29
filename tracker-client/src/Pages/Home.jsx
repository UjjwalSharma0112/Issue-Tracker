import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [repos,setRepos]=useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/user/repos")
            .then(response => console.log(setRepos(response.data)))
            .catch(error => console.error("Error fetching data:", error));
    }, []); // Empty dependency array means this runs once when the component mounts
    const reposList=repos.map(repos=><li>{repos}</li>)
    return (
        <div>
            <h1>Home</h1>
            <ul>reposList</ul>
        </div>
    );
}
