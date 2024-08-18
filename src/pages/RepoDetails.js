import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRepoDetails } from '../services/githubApi';
import IssueForm from '../components/IssueForm';
import IssueList from '../components/IssueList';
import PullRequestForm from '../components/PullRequestForm';
import PullRequestList from '../components/PullRequestList';
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
          <div className="issues-section">
            <h3>Issues</h3>
            <IssueForm owner={owner} repo={repo} />
            <IssueList owner={owner} repo={repo} />
          </div>
          <div className="pull-requests-section">
            <h3>Pull Requests</h3>
            <PullRequestForm owner={owner} repo={repo} />
            <PullRequestList owner={owner} repo={repo} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RepoDetails;
