const express = require("express")
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const createError = require('http-errors')
const UserRouter = require('./Routes/User.route');

//config server
dotenv.config();
require('./utils/connections_mongodb')
require('./models/userModel')
const app = express();
const PORT = '3000'

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('HOME')
})


console.log(mongoose.connection.readyState);

app.use('/api',UserRouter)

app.use((req, res, next) => {
  next(createError.NotFound('This route does not exist'))
})

app.use((error, req, res, next) => {
  res.json({
    status: error.status || 500,
    message: error.message
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
})
