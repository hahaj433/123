  const mongoose = require('mongoose')
  const bcrypt = require('bcrypt')
  const conn = require('../utils/connections_mongodb');

  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    }
  }, { timestamps: true }
  )
  
  userSchema.pre('save', async function (next) {
    try {
      console.log("brug");
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(this.password, salt);
      this.password = hashPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = mongoose.model("User", userSchema)