const mongoose = require('mongoose')

const conn = mongoose.createConnection(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

conn.on('connected', function () {
  console.log(`MongoDB connected`);
})

conn.on('disconnected', function () {
  console.log(`MongoDB disconnected`);
})

conn.on('error', function (error) {
  console.log(`MongoDB error ${JSON.stringify(error)}`);
})

process.on('SIGNINT', async () => {
  await conn.close();
  process.exit(0)
})

module.exports = conn
