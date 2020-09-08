const Sequelize = require('sequelize')
const sequelize = require('../DB_connect.js')

const category = sequelize.define('user_marathon_relations', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },
})

module.exports = category