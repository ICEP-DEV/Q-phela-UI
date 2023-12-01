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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', router);

app.get('/get_survey_summary_report/:name', async (req, res) => {
  var sql = `select l.name, r.incident_type, count(incident_type) as num_per_crime
    from report r, location l
    where r.location_id = l.location_id and l.name=?
    group by  r.incident_type;`;

  await db.query(sql, req.params.name, (err, rows) => {
    if (err) throw err;

    if (rows.length > 0) {
      let isFoundrape = false;
      let isFoundcarjercking = false;
      let isFoundkidnaping = false;
      let isFoundmuging = false;
      let isFoundother = false;

      var locationnames = [];
      var incident_types = [];
      var numper_per_incedences = [];

      for (var k = 0; k < rows.length; k++) {
        if (rows[k].incident_type.toLowerCase() === "rape") {
          isFoundrape = true;
          locationnames.push(rows[k].name);
          incident_types.push(rows[k].incident_type);
          numper_per_incedences.push(rows[k].num_per_crime);
        }
        if (rows[k].incident_type.toLowerCase() === "car jercking") {
          isFoundcarjercking = true;
          locationnames.push(rows[k].name);
          incident_types.push(rows[k].incident_type);
          numper_per_incedences.push(rows[k].num_per_crime);
        }
        if (rows[k].incident_type.toLowerCase() === "kidnaping") {
          isFoundkidnaping = true;
          locationnames.push(rows[k].name);
          incident_types.push(rows[k].incident_type);
          numper_per_incedences.push(rows[k].num_per_crime);
        }
        if (rows[k].incident_type.toLowerCase() === "muging") {
          isFoundmuging = true;
          locationnames.push(rows[k].name);
          incident_types.push(rows[k].incident_type);
          numper_per_incedences.push(rows[k].num_per_crime);
        }
        if (rows[k].incident_type.toLowerCase() === "other") {
          isFoundother = true;
          locationnames.push(rows[k].name);
          incident_types.push(rows[k].incident_type);
          numper_per_incedences.push(rows[k].num_per_crime);
        }
      }

      if (isFoundrape == false) {
        incident_types.push('rape');
        numper_per_incedences.push(0);
      }
      if (isFoundcarjercking == false) {
        incident_types.push('car jercking');
        numper_per_incedences.push(0);
      }
      if (isFoundkidnaping == false) {
        incident_types.push('kidnaping');
        numper_per_incedences.push(0);
      }
      if (isFoundmuging == false) {
        incident_types.push('muging');
        numper_per_incedences.push(0);
      }
      if (isFoundother == false) {
        incident_types.push('other');
        numper_per_incedences.push(0);
      }

      res.send({ incident_types, locationnames, numper_per_incedences, success: true });
    } else {
      res.send({ message: "No data found", success: false });
    }
  });
});

const port = process.env.PORT || 3008;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});