const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 52000
});
console.log(mongoose.connection.readyState);
conn.on('connected', function () {
  console.log(`MongoDB connected`);
  checkConnectionStatus();
});

conn.on('disconnected', function () {
  console.log(`MongoDB disconnected`);
  checkConnectionStatus();
});

conn.on('error', function (error) {
  console.log(`MongoDB error ${JSON.stringify(error)}`);
  checkConnectionStatus();
});

process.on('SIGINT', async () => {
  await conn.close();
  process.exit(0);
});

function checkConnectionStatus() {
  console.log(`Current connection status: ${conn.readyState}`);
  switch (conn.readyState) {
    case 0:
      console.log('Disconnected');
      break;
    case 1:
      console.log('Connected');
      break;
    case 2:
      console.log('Connecting');
      break;
    case 3:
      console.log('Disconnecting');
      break;
    default:
      console.log('Unknown state');
  }
}

module.exports = conn;
