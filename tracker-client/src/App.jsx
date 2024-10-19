import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.github.com/repos/formbricks/formbricks/issues')
      .then(response => {
        setData(response.data); // Use response.data to get the actual data
      })
      .catch(error => {
        console.error(error);
        setError(error);
      });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      {error && <p>Error fetching data: {error.message}</p>}
      {data.length > 0 ? (
        <ul>
          {data.map(issue => (
            <li key={issue.id}>
              <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
                {issue.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
