// model of Admin.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/app.js'); 

const admin = sequelize.define('admin', {
    admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },

      admin_name: {
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
});

//associations
admin.associate = (models) => {
 
  admin.hasMany(models.Report, {
    foreignKey: 'admin_id', 
    as: 'reports', // Alias
  });
{
  timestamps: true, // Enable timestamps
  createdAt: 'created_at', 
  updatedAt: 'updated_at', 
}
};

module.exports = admin;
