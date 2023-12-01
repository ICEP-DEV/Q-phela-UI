const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'q_pheladb',
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});
app.get('/messages', (req, res) => {
  const query = 'SELECT * FROM chat_messages';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving messages:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});
app.post('/messages', (req, res) => {
  const { user_input, bot_response } = req.body;
  if (!user_input || !bot_response) {
    return res.status(400).send('Invalid input. Both user_input and bot_response are required.');
  }
  const query = 'INSERT INTO chat_messages (user_input, bot_response) VALUES (?, ?)';
  const values = [user_input, bot_response];
  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error adding message to the database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).send('Message added to the database');
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});