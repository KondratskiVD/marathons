const express = require('express')
const Marathon = require('../models/marathon')
const router = express.Router();

// Получение всех пользователей
router.get('/', async (req, res) => {
  try {
    const marathons = await Marathon.findAll()
    res.status(200).json({marathons})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

module.exports = router