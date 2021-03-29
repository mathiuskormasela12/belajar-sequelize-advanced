// ==== user routes
// import all modules
const express = require('express')

// import controllers
const userController = require('../controllers/user')

const router = express.Router()

router.get('/user', userController.register)

module.exports = router
