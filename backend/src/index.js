const pool = require('./db');
const express = require('express');
const cors = require('cors');
const surveyRoutes = require('./routes/survey');

const app = express();
app.use(cors());
app.use(express.json());

// Test DB connection
pool.query('SELECT NOW()', (err, res) => {
  if(err) console.error(err);
  else console.log('DB connected:', res.rows[0]);
});

// Routes
app.use('/api/surveys', surveyRoutes);

// Test API
app.get('/', (req, res) => res.send('Stress Monitor API running ✅'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
