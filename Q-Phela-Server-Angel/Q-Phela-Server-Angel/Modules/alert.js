const { DataTypes } = require('sequelize');
const sequelize = require('../config/app.js'); 

const alert = sequelize.define('alert', {
    alert_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
  description: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
  },
});

// relationship
alert.associate = (models) => { //define
  alert.belongsTo(models.location, {
    foreignKey: 'location_id',
    as: 'location',
  });
  alert.belongsTo(models.citizen, {
    foreignKey: 'citizen_id',
    as: 'citizen',
  });

};

module.exports = alert;
