import axios from 'axios';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
});

const backendApi = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getUserRepos = (username) =>
  githubApi.get(`/users/${username}/repos`);

export const getRepoDetails = (owner, repo) =>
  githubApi.get(`/repos/${owner}/${repo}`);

export const getIssues = (owner, repo) =>
  backendApi.get(`/issues?owner=${owner}&repo=${repo}`);

export const createIssue = (owner, repo, data) =>
  backendApi.post('/issues', { ...data, owner, repo });

export const updateIssue = (id, data) =>
  backendApi.put(`/issues/${id}`, data);

export const deleteIssue = (id) =>
  backendApi.delete(`/issues/${id}`);

export const getPullRequests = (owner, repo) =>
  githubApi.get(`/repos/${owner}/${repo}/pulls`);

export const createPullRequest = (owner, repo, data) =>
  githubApi.post(`/repos/${owner}/${repo}/pulls`, data);
