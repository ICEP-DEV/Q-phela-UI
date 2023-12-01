// model Citizen.js

const { DataTypes } = require('sequelize');
const sequelize = require('../app');

const citizen = sequelize.define('citizen', {
  citizen_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  citizen_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});
// Associations
Citizen.associate = (models) => {
  Citizen.hasMany(models.report, {
    foreignKey: 'citizen_id',
    as: 'reports',
  });
  
};

module.exports = citizen;
