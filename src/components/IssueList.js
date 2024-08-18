import React, { useEffect, useState } from 'react';
import { getIssues, deleteIssue } from '../services/apiService';
import { List, ListItem, ListItemText, Button } from '@mui/material';

function IssueList({ owner, repo }) {
    const [issues, setIssues] = useState([]);

    const fetchIssues = async () => {
        try {
            const response = await getIssues(owner, repo);
            setIssues(response);
        } catch (error) {
            console.error('Error fetching issues:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteIssue(id);
            fetchIssues();
        } catch (error) {
            console.error('Error deleting issue:', error);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, [owner, repo]);

    return (
        <List>
            {issues.map((issue) => (
                <ListItem key={issue.id}>
                    <ListItemText primary={issue.title} secondary={issue.body} />
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(issue.id)}>
                        Delete
                    </Button>
                </ListItem>
            ))}
        </List>
    );
}

export default IssueList;
