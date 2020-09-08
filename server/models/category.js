const Sequelize = require('sequelize')
const sequelize = require('../DB_connect.js')

const category = sequelize.define('categories', {
  category_id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },
  categories_title: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

module.exports = category