import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRepoDetails } from '../services/githubApi';
import './RepoDetails.css';

function RepoDetails() {
  const { owner, repo } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const response = await getRepoDetails(owner, repo);
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching repo details:', error);
      }
    };

    fetchRepoDetails();
  }, [owner, repo]);

  return (
    <div className="repo-details">
      {details ? (
        <div>
          <h2>{details.name}</h2>
          <p>{details.description}</p>
          <p>
            <strong>Stars:</strong> {details.stargazers_count}
          </p>
          <p>
            <strong>Forks:</strong> {details.forks_count}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RepoDetails;
