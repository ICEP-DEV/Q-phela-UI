const { DataTypes } = require('sequelize');
const sequelize = require('../config/user.js'); 

const trip = sequelize.define('trip', {
  trip_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  trip_description: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
  },
});

//associations
trip.associate = (models) => {
    trip.belongsTo(models.location, {
      foreignKey: 'location_id',
      as: 'location',
    });
    trip.belongsTo(models.citizen, {
      foreignKey: 'citizen_id',
      as: 'citizen',
    });

  };
module.exports = trip;
