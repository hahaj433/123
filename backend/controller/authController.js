const createError = require('http-errors')

const User = require('../models/userModel')
const { userValidate } = require('../validations/validation')

const authController = {
  registerUser: async (req, res, next) => {
    try {
      const { username, password } = req.body
      // const { error } = userValidate(req.body)

      // if(error){
      //   throw createError.BadRequest(error.details[0].message)
      // }

      // const isExist = await User.findOne({
      //   username: username
      // })

      // if (isExist) {
      //   console.log(isExist);
      //   throw createError.Conflict(`${username} is already existed`)
      // }

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