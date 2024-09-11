const router = require('express').Router()
const authController =require('../controller/authController')

router.post("/register",authController.registerUser);

module.exports = router