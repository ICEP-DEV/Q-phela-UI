const { DataTypes } = require('sequelize');
const sequelize = require('../config/user.js'); // Replace with your database configuration

const safety_tip = sequelize.define('safety_tip', {
    tip_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },

  tip_description: {
    type: DataTypes.TEXT,
  },

});

// relationships
safety_tip.associate = (models) => {
  safety_tip.belongsTo(models.location, {
    foreignKey: 'location_id',
    as: 'location',
  });
  safety_tip.belongsTo(models.citizen, {
    foreignKey: 'citizen_id',
    as: 'citizen',
  });

};

module.exports = safety_tip;
