const { DataTypes } = require('sequelize');
const sequelize = require('../config/user.js'); // Replace with your database configuration

const recommendation = sequelize.define('recommendation', {

    recommendation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
  rec_description: {
    type: DataTypes.TEXT,
  },
  start_location: {
    type: DataTypes.STRING,
  },
  end_location: {
    type: DataTypes.STRING,
  },
});
recommendation.associate = (models) => {
  recommendation.belongsTo(models.location, {
    foreignKey: 'location_id',
    as: 'location',
  });
  recommendation.belongsTo(models.citizen, {
    foreignKey: 'citizen_id',
    as: 'citizen',
  });
};

module.exports = recommendation;
