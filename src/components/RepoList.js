import React from 'react';
import { Link } from 'react-router-dom';

function RepoList({ repos }) {
  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>
          <Link to={`/repo/${repo.owner.login}/${repo.name}`}>{repo.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default RepoList;
