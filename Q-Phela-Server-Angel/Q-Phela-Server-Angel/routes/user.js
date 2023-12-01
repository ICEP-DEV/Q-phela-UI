const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors=require('cors');
//const db= require('./config/database'); // Your database and secret key configuration

// MySQL Connection Configuration
const mysql = require('mysql');
const db = mysql.createConnection({
  host: "localhost",         // Replace with the actual host if hosted remotely
  user: "root",
  password: "",
  database: "q_pheladb"
});

const app = express();
//cccc
app.use(bodyParser.json());
app.use(cors());
app.post('/register', (req, res) => {
  const { citizen_name, email, password, contact_number } = req.body;
  if (!citizen_name || !email || !password || !contact_number) {
    return res.status(400).json({ message: 'All fields are required', success: false });
  }

  // Check if the email already exists
  const checkEmailQuery = 'SELECT * FROM citizen WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error', success: false });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: 'User with this email already exists', success: false });
    }

    // If email doesn't exist, proceed with registration
    const sql = 'INSERT INTO citizen (citizen_name, email, password, contact_number) VALUES (?, ?, ?, ?)';
    db.query(sql, [citizen_name, email, password, contact_number], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Registration failed', success: false });
      }
      console.log(result);
      res.status(201).json({ message: 'Registration successful', success: true });
    });
  });
});

    /*app.post('/login', (req, res) => {
        console.log(req.body)
        if (!req.body.email || !req.body.password) {
          return res.status(400).json({ message: 'Username and password are required',success:false });
        }
        const sql = 'SELECT * FROM citizen WHERE email = ?';
        db.query(sql, [req.body.email], (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
          }
          if (results.length === 0) {
            console.log('No user found with email:', req.body.email);
            return res.status(401).json({ message: 'Invalid credentials', success:false });
          }
      
          const citizen = results[0];

          //bcrypt.compare(password, user.password, (err, isPasswordValid) => {
            if (req.body.password !== citizen.password) {
              console.log('Password mismatch for citizen:', citizen.citizen_name);
              return res.status(401).json({ message: 'Invalid credentials', success:false });
            }
        
         //   const token = jwt.sign({ citizen_id: citizen.id }, config.secretKey, { expiresIn: '1h' });
        
            res.status(200).json({ results,success:true });
          });
        });*/

        app.post('/login', (req, res) => {
          console.log('Login request:',req.body);
          const { email, password } = req.body;
          if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required', success: false });
          }
          
          const citizenSql = 'SELECT * FROM citizen WHERE email = ?';
          const adminSql = 'SELECT * FROM admin WHERE email = ?';
          db.query(citizenSql, [email], (err, citizenResults) => {
            if (err) {
              console.error('Citizen SQL error:', err);
              return res.status(500).json({ message: 'Internal server error' });
          }
          console.log('Citizen Results:', citizenResults); // Log the results

          db.query(adminSql, [req.body.email], (err, adminResults) => {
          if (err) {
            console.log('Admin Results:', adminResults);
            return res.status(500).json({ message: 'Internal server error' });
          }
          if (citizenResults.length === 0 && adminResults.length === 0) {
          console.log('No user found with email:', req.body.email);
          return res.status(401).json({ message: 'Invalid credentials', success:
          false });
          }
          if (citizenResults.length > 0 && req.body.password === 
          citizenResults[0].password) {
          // Citizen successfully logged in
          return res.status(200).json({ results: citizenResults, role:
          'citizen', success: true });
          } else if (adminResults.length > 0 && req.body.password === 
          adminResults[0].password) {
          // Admin successfully logged in
          return res.status(200).json({ results: adminResults, role: 'admin', 
          success: true });
          } else {
          // Password mismatch
          console.log('Password mismatch for user:', req.body.email);
          return res.status(401).json({ message: 'Invalid credentials', success:
          false });
          }
          });
          });
          });
      const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});      
