const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
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
//you get all of them
app.get('/safety_tip', (req, res) => {
    const sql = 'SELECT st.*, c.citizen_name AS citizen_name FROM safety_tips st JOIN citizen c ON st.citizen_id = c.citizen_id';
    //'SELECT * FROM safety_tips';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json(results);
    });
});
//retrieve per tip
app.get('/safety_tip/:tip_id', (req, res) => {
    const tip_id= req.params.tip_id;                                                
    const sql =  'SELECT st.*, c.citizen_name AS citizen_name FROM safety_tips st JOIN citizen c ON st.citizen_id = c.citizen_id WHERE st.tip_id = ?';
  //'SELECT * FROM safety_tips WHERE tip_id = ?';
    db.query(sql, [tip_id], (err, results) => {
        if (err) {
            console.error(err);                                                                                            
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Safety tip not found' });
        }
        res.status(200).json(results[0]);
    });
});

//add safety tip                           
app.post('/safety_tip', (req, res) => {
    const {  tip_description, citizen_id} = req.body; 
   // const tip_description = req.user.citizen_id;
    if (!tip_description || !citizen_id){
        return res.status(400).json({ message: 'Tip description,  citizen_id and location_id are required' });
    }
    const sql = 'INSERT INTO safety_tips (tip_description, citizen_id) VALUES (?, ?)';
    db.query(sql, [tip_description, citizen_id ], (err, result) => {

 
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to add safety tip' });
        }
        const newTip = {
            tip_id: result.insertid,
            tip_description,
            citizen_id,
            date: new Date(),
             
        };

        res.status(201).json({ message: 'Safety tip added successfully'});
    })

});
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});