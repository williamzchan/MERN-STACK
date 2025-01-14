const express = require('express')

//controller functions
const {signupUser, loginUser} = require('../controllers/userController')

const router = express.Router()

//Route for logins
router.post('/login', loginUser)

//Route for signups
router.post('/signup', signupUser)

module.exports = router