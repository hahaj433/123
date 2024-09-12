const createError = require('http-errors')
const con = require('../utils/connections_mongodb')
const User = require('../models/userModel')


const { userValidate } = require('../validations/validation')

const authController = {
  registerUser: async (req, res, next) => {
    try {
      const { username, password } = req.body
      const { error } = userValidate(req.body)
      
      if(error){
        throw createError.BadRequest(error.details[0].message)
      }
      console.log(con.readyState+" at auth controller")
      const isExist = await User.findOne({
        username: username
      })
      // problem
      if (isExist) {
        console.log(isExist);
        throw createError.Conflict(`${username} is already existed`)
      }

      const newUser = new User({
        username,
        password
      })

      const savedUser = await newUser.save()
      
      return res.json({
        status: 200,
        element: savedUser
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = authController