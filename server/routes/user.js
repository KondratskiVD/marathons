const express = require('express')
const User = require('../models/user')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = 'secret'

// Получение всех пользователей
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json({users})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

router.post('/registration', async (req, res) => {
  try {
    let userData = {
      email: req.body.user_email,
      password: req.body.password,
      firstName: req.body.user_first_name,
      secondName: req.body.user_second_name,
      role: req.body.user_role
    }
    await User.findOne({
      where: {
        email: req.body.user_email
      }
    }).then(user => {
      if(!user) {
        const hash = bcrypt.hashSync(userData.password, 8)
        userData.password = hash
        User.create(userData)
          .then(user => {
            let token = jwt.sign( user.dataValues, process.env.SECRET_KEY, {expiresIn: 1440})
            res.json({token: token, auth: true, user })
          })
          .catch(err => {
            res.send('error from server: ' + err)
          })
      } else {
        res.status(500).send({
          message:'Пользователь с таким именем уже существует.'})
      }
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    await User.findOne({
      where: {
        email: req.body.user_email
      }
    }).then(user => {
      if(bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign( user.dataValues, process.env.SECRET_KEY, {expiresIn: 1440})
        res.json({token: token, auth: true, user })
      } else {
        res.status(500).send({ message: 'Неправильный пароль.' });
      }
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      message: `Пользователь ${req.body.user_email} не существует.`
    })
  }
})

module.exports = router