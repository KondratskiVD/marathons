const { Router } = require('express')
const Category = require('../models/category')
const router = Router()

// Получение всех пользователей
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll()
    res.status(200).json({categories})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

module.exports = router