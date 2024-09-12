const router = require('express').Router()
const authController =require('../controller/authController')

router.post("/register",authController.registerUser);
// hello world
module.exports = router