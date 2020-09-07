const Sequelize = require('sequelize')

const DB_NAME = 'marathons'
const USER_NAME = 'user'
const PASSWORD = 'user'

const connection = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false
  }
})

module.exports = connection