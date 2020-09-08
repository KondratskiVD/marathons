const path = require('path')
const cors = require('cors');
const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const sequelize = require('./DB_connect')

const bodyParser = require('body-parser');
const app = express()
app.set('port', process.env.SERVER_PORT);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());

app.use('/api/user', require('./routes/user'));
app.use('/api/categories', require('./routes/category'));
app.use('/api/marathons', require('./routes/marathon'));

async function start() {
  try {
    // await sequelize.sync({force:true})
    app.listen(app.get('port'), () => {
      console.log(`[OK] Server is running on localhost:${app.get('port')}`);
    });
  } catch (e) {
    console.log(e)
  }
}

start()