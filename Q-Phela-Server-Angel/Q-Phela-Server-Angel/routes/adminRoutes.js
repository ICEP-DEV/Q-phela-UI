const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "q_pheladb"
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/admin/login', (req, res) => {
  const { email, password } = req.body;


  const sql = 'SELECT * FROM admin WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }

    // Admin successfully logged in
    res.status(200).json({ message: 'Admin logged in successfully' });
  });
});
 

app.get('/admin/reports', (req, res) => {
    const sql = `
        SELECT
        r.report_id,
            r.incident_type AS "incident_type",
            r.rep_description AS "rep_description",
            c.citizen_name AS "citizen_name",
            c.contact_number AS "contact_number",
            c.email AS "email",
            l.latitude AS "latitude",
            l.longitude AS "longitude"
        FROM
            report r
            JOIN citizen c ON r.citizen_id = c.citizen_id
            JOIN location l ON r.location_id = l.location_id`;
           
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Transform the response to match the desired structure
        const transformedResults = results.map(result => ({
          report_id: result.report_id,
            incident_type: result.incident_type,
            rep_description: result.rep_description,
            citizen_name: result.citizen_name,
            contact_number:result.contact_number,
            email: result.email,
            latitude: result.latitude,
            longitude: result.longitude
        }));

        res.status(200).json(transformedResults);
    });
});


app.get('/admin/reports/:report_id/contact', (req, res) => {
  const report_id = req.params.report_id;  // Corrected parameter name

  const getContactInfoQuery = `
    SELECT c.citizen_name, c.contact_number, c.email
    FROM report r
    JOIN citizen c ON r.citizen_id = c.citizen_id
    WHERE r.report_id = ?`;

  db.query(getContactInfoQuery, [report_id], (error, results) => {
    if (error) {
      console.error('Error fetching contact info:', error);
      return res.status(500).json({ message: 'Failed to fetch contact info' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Contact information not found' });
    }

    const contactInfo = results[0]; // Assuming there's only one matching record
    res.status(200).json(contactInfo);
  });
});





// API endpoint to get tips for admin
app.get('/admin/tips', (req, res) => {


  const getTipsQuery = 'SELECT * FROM safety_tips';

  db.query(getTipsQuery, (error, results) => {
    if (error) {
      console.error('Error fetching tips:', error);
      return res.status(500).json({ message: 'Failed to fetch tips' });
    }


    const safety_tips = results;

    res.status(200).json({ safety_tips });
  });
});


// API endpoint to delete a tip using tips_id
app.delete('/admin/tips/:id', (req, res) => {
  const tip_id = req.params.id;

  const deleteTipQuery = 'DELETE FROM safety_tips WHERE tip_id = ?';

  db.query(deleteTipQuery, [tip_id], (error, results) => {
    if (error) {
      console.error('Error deleting tip:', error);
      return res.status(500).json({ message: 'Failed to delete tip' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Tip not found' });
    }

    res.status(200).json({ message: 'Tip deleted successfully' });
  });
});
 
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});