// src/components/EnhancedForm.js

import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';

function EnhancedForm({ onSubmit, fields }) {
    const [formData, setFormData] = useState({});
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            setOpen(true);
        } catch (error) {
            setError('Error performing operation');
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <TextField
                        key={field.name}
                        label={field.label}
                        value={formData[field.name] || ''}
                        onChange={handleChange(field.name)}
                        fullWidth
                        required={field.required}
                    />
                ))}
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
            {error && <Alert severity="error">{error}</Alert>}
            <Snackbar
                open={open}
                message="Operation completed successfully!"
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
            />
        </>
    );
}

export default EnhancedForm;
