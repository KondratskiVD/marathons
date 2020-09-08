const express = require('express')
const router = express.Router();
const entities = require('../models/entities.js')

// Получение всех пользователей
// router.get('/', async (req, res) => {
//   try {
//     const marathons = await entities.Marathon.findAll()
//     res.status(200).json({marathons})
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({
//       message: 'Server error'
//     })
//   }
// })

router.post('/', async (req, res) => {
  try {
    const userId = req.body.userId
    let createdMarathon
    await entities.Marathon.create({
      title: req.body.title,
      type: req.body.type,
      startDate: req.body.startDate,
      finishDate: req.body.finishDate,
      categoryId: req.body.categoryId,
    })
      .then(newMarathon => {
        if(!newMarathon) return;
        createdMarathon = newMarathon
        entities.Marathon.findOne({where: {id: newMarathon.id}})
          .then(marathon=> {
            if(!marathon) return;
            entities.User.findOne({where: {id: userId}})
              .then(user => {
                if(!user) return;
                marathon.addUser(user);
                res.json({createdMarathon })
              })
              .catch(err => {
                res.send('error from server: ' + err)
              })
          })
          .catch(err => {
            res.send('error from server: ' + err)
          })
      })
      .catch(err => {
      res.send('error from server: ' + err)
    })
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: 'Server error'
      })
    }
})

router.post('/users_marathons', async (req, res) => {
  try {
    const userId = req.body.id
    await entities.User.findOne({where: {id: userId}})
      .then(user =>{
        if(!user) return;
        user.getMarathons()
          .then( marathons => {
            console.log('step 2')
            res.json({ marathons })
          })
          .catch(err => {
          res.send('error from server: ' + err)
        })
      });
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

module.exports = router