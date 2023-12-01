const { DataTypes } = require('sequelize');
const sequelize = require('../config/user.js');

const location = sequelize.define('location', {
    location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: false,
  },
});
// associations
location.associate = (models) => {
    location.hasMany(models.report, {
      foreignKey: 'location_id',
      as: 'reports',//alias
    });
    location.hasMany(models.trip, {
      foreignKey: 'location_id',
      as: 'trip',
    });
    
  };

module.exports = location;
