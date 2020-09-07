const Sequelize = require('sequelize')
const sequelize = require('../DB_connect.js')

const marathon = sequelize.define('marathons', {
  marathons_id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },
  marathons_title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  marathons_start: {
    type: Sequelize.DATE,
    allowNull: false
  },
  marathons_finish: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  category_id: {
    type: Sequelize.DATE,
    allowNull: false
  },
})
module.exports = marathon