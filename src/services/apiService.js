import axios from 'axios';

// GitHub API instance
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

// Backend API instance
const backendApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api', // Use environment variable or default to localhost
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to create an issue
export const createIssue = async (data) => {
  try {
    const response = await backendApi.post('/issues', data);
    return response.data;
  } catch (error) {
    console.error('Error creating issue:', error.response ? error.response.data : error.message);
    throw new Error('Failed to create issue');
  }
};

// Function to get issues by owner and repo
export const getIssues = async (owner, repo) => {
  try {
    const response = await backendApi.get('/issues', {
      params: { owner, repo },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching issues:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch issues');
  }
};

// Function to update an issue by ID
export const updateIssue = async (id, data) => {
  try {
    const response = await backendApi.put(`/issues/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating issue:', error.response ? error.response.data : error.message);
    throw new Error('Failed to update issue');
  }
};

// Function to delete an issue by ID
export const deleteIssue = async (id) => {
  try {
    const response = await backendApi.delete(`/issues/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting issue:', error.response ? error.response.data : error.message);
    throw new Error('Failed to delete issue');
  }
};

// Function to get pull requests from GitHub API
export const getPullRequests = async (owner, repo) => {
  try {
    const response = await githubApi.get(`/repos/${owner}/${repo}/pulls`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pull requests:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch pull requests');
  }
};
