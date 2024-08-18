import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createIssue } from '../services/apiService';
import { TextField, Button, Snackbar, Alert } from '@mui/material';

function IssueForm({ owner, repo, onCreate }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !body) {
            setError('Title and body are required.');
            return;
        }
        try {
            await createIssue({ title, body, owner, repo });
            setTitle('');
            setBody('');
            setOpen(true);
            onCreate(); // Callback to refresh issues list
        } catch (error) {
            setError('Error creating issue');
            console.error('Error creating issue:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Create Issue
                </Button>
            </form>
            {error && <Alert severity="error">{error}</Alert>}
            <Snackbar
                open={open}
                message="Issue created successfully!"
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
            />
        </>
    );
}

IssueForm.propTypes = {
    owner: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    onCreate: PropTypes.func.isRequired,
};

export default IssueForm;
