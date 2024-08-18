import React, { useState } from 'react';
import { createPullRequest } from '../services/githubApi';
import { TextField, Button } from '@mui/material';

function PullRequestForm({ owner, repo }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [head, setHead] = useState('');
  const [base, setBase] = useState('main');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPullRequest(owner, repo, { title, body, head, base });
      setTitle('');
      setBody('');
      setHead('');
      // Refresh PR list or handle success
    } catch (error) {
      console.error('Error creating pull request:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        label="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        multiline
        rows={4}
        fullWidth
      />
      <TextField
        label="Head Branch"
        value={head}
        onChange={(e) => setHead(e.target.value)}
        fullWidth
      />
      <TextField
        label="Base Branch"
        value={base}
        onChange={(e) => setBase(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Create Pull Request
      </Button>
    </form>
  );
}

export default PullRequestForm;
