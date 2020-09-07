const Sequelize = require('sequelize')
const sequelize = require('../DB_connect.js')

const user = sequelize.define('users', {
  user_id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },
  user_email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_second_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_role: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

module.exports = user