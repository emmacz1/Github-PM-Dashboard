const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL pool setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Create (POST)
app.post('/api/issues', async (req, res) => {
  const { title, body, owner, repo } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO issues (title, body, owner, repo) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, body, owner, repo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating issue:', err);
    res.status(500).json({ error: 'Failed to create issue' });
  }
});

// Read (GET) all issues
app.get('/api/issues', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM issues');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching issues:', err);
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
});

// Read (GET) a single issue by ID
app.get('/api/issues/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM issues WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Issue not found' });
    }
  } catch (err) {
    console.error('Error fetching issue:', err);
    res.status(500).json({ error: 'Failed to fetch issue' });
  }
});

// Update (PUT)
app.put('/api/issues/:id', async (req, res) => {
  const { id } = req.params;
  const { title, body, owner, repo } = req.body;
  try {
    const result = await pool.query(
      'UPDATE issues SET title = $1, body = $2, owner = $3, repo = $4 WHERE id = $5 RETURNING *',
      [title, body, owner, repo, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Issue not found' });
    }
  } catch (err) {
    console.error('Error updating issue:', err);
    res.status(500).json({ error: 'Failed to update issue' });
  }
});

// Delete (DELETE)
app.delete('/api/issues/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM issues WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Issue deleted successfully' });
    } else {
      res.status(404).json({ error: 'Issue not found' });
    }
  } catch (err) {
    console.error('Error deleting issue:', err);
    res.status(500).json({ error: 'Failed to delete issue' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
