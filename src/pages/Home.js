import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserRepos } from '../services/githubApi';
import './Home.css';

function Home() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);

  const fetchRepos = async () => {
    try {
      const response = await getUserRepos(username);
      setRepos(response.data);
    } catch (error) {
      console.error('Error fetching repos:', error);
    }
  };

  return (
    <div className="home">
      <h2>Search Repositories by Username</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="GitHub Username"
      />
      <button onClick={fetchRepos}>Search</button>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <Link to={`/repo/${repo.owner.login}/${repo.name}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
