const { DataTypes } = require('sequelize');
const sequelize = require('../config/user.js'); 
/*
report_id INT PRIMARY KEY AUTO_INCREMENT,
    incident_type VARCHAR(255) NOT NULL,
    rep_description TEXT,
    date DATE,
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES location(location_id),
    citizen_id INT,
    FOREIGN KEY (citizen_id) REFERENCES citizen(citizen_id)
*/ 
const report = sequelize.define('report', {
  report_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  incident_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
  },
});

//associations
report.associate = (models) => {
    report.belongsTo(models.citizen, {
      foreignKey: 'citizen_id',
      as: 'citizen', 
    });

    report.belongsTo(models.location, {
      foreignKey: 'location_id',
      as: 'location',
    });
    
  };

module.exports = report;
