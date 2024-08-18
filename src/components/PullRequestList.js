import React, { useEffect, useState } from 'react';
import { getPullRequests } from '../services/githubApi';
import { List, ListItem, ListItemText } from '@mui/material';

function PullRequestList({ owner, repo }) {
  const [pullRequests, setPullRequests] = useState([]);

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        const response = await getPullRequests(owner, repo);
        setPullRequests(response.data);
      } catch (error) {
        console.error('Error fetching pull requests:', error);
      }
    };

    fetchPullRequests();
  }, [owner, repo]);

  return (
    <List>
      {pullRequests.map((pr) => (
        <ListItem key={pr.id}>
          <ListItemText primary={pr.title} secondary={pr.body} />
        </ListItem>
      ))}
    </List>
  );
}

export default PullRequestList;
