const Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
  'employers',
  {
    empId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    empName: {
      type: Sequelize.STRING
    },
    empActive: {
      type: Sequelize.TINYINT
    },
    empDepartment: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAT: {
      type: Sequelize.DATE
    }
  },
  {
    timestamps: false
  }
);
