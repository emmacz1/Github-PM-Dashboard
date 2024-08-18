// Example usage in a parent component (e.g., IssueFormContainer.js)

import React from 'react';
import EnhancedForm from '../components/EnhancedForm';
import { createIssue } from '../services/apiService';

function IssueFormContainer({ owner, repo }) {
    const handleCreateIssue = async (formData) => {
        // Add additional data if needed
        formData.owner = owner;
        formData.repo = repo;
        await createIssue(formData);
        // Handle success or refresh state as needed
    };

    const fields = [
        { name: 'title', label: 'Title', required: true },
        { name: 'body', label: 'Body', required: true },
    ];

    return (
        <div>
            <h2>Create a New Issue</h2>
            <EnhancedForm onSubmit={handleCreateIssue} fields={fields} />
        </div>
    );
}

export default IssueFormContainer;
