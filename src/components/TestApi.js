import React, { useState } from 'react';
import { createIssue, getIssues, updateIssue, deleteIssue } from '../services/apiService';

const TestApi = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCreateIssue = async () => {
    try {
      setLoading(true);
      const newIssue = await createIssue({
        title: 'New Test Issue',
        body: 'This is a test issue.',
        owner: 'testOwner',
        repo: 'testRepo',
      });
      console.log('Created Issue:', newIssue);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetIssues = async () => {
    try {
      setLoading(true);
      const fetchedIssues = await getIssues('testOwner', 'testRepo');
      setIssues(fetchedIssues);
      console.log('Fetched Issues:', fetchedIssues);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateIssue = async (id) => {
    try {
      setLoading(true);
      const updatedIssue = await updateIssue(id, {
        title: 'Updated Test Issue',
        body: 'This is an updated test issue.',
      });
      console.log('Updated Issue:', updatedIssue);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIssue = async (id) => {
    try {
      setLoading(true);
      await deleteIssue(id);
      console.log('Deleted Issue:', id);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Test API</h2>
      <button onClick={handleCreateIssue} disabled={loading}>
        Create Issue
      </button>
      <button onClick={handleGetIssues} disabled={loading}>
        Get Issues
      </button>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            {issue.title} <button onClick={() => handleUpdateIssue(issue.id)}>Update</button>{' '}
            <button onClick={() => handleDeleteIssue(issue.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestApi;
