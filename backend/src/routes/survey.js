const express = require('express');
const router = express.Router();
const pool = require('../db'); // connect to PostgreSQL

// Submit survey
router.post('/submit', async (req, res) => {
  const { employee_id, mood_rating, stress_rating, free_text } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO surveys (employee_id, mood_rating, stress_rating, free_text) VALUES ($1,$2,$3,$4) RETURNING *',
      [employee_id, mood_rating, stress_rating, free_text]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all surveys
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM surveys ORDER BY survey_date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
