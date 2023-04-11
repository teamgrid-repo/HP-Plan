const https = require('https');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const chalk = require('chalk');
const sioRedis = require('socket.io-redis');
const { envConstants } = require('./helpers/constants');
const messageController = require("./controllers/messages/message.helper")

const app = require('./app');

const cert = fs.existsSync(`${__dirname}/cert.pem`) && fs.readFileSync(`${__dirname}/cert.pem`);
const key = fs.existsSync(`${__dirname}/privkey.pem`) && fs.readFileSync(`${__dirname}/privkey.pem`);

let server;

if (envConstants.NODE_ENV === 'staging' &&key && cert) {
  server = https.createServer({ key, cert }, app);
} else {
  server = http.createServer(app);
}

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET","POST"],
  }
});

if (envConstants.REDIS_SERVER === 'true') {
  io.adapter(sioRedis({ host: 'localhost', port: 6379, requestsTimeout: 5000 }));
}

const users = {};
io.on('connection', (socket) => {
  socket.on('CLIENT_JOINED', async (data) => {
    console.log(`User with ID ${socket.id} has Joined Room ${JSON.stringify(data)}`);
    socket.join(data.room);
  });

  socket.on("sendMessage",async (data)=>{
    console.log("data", data)
    let message
    if(!data["alreadySaved"]){
      message = await messageController.saveChat({...data, socketId: socket.id}, users)
    }
    io.to(data.room).emit("new_message", !data["alreadySaved"] ? message.msg : data)

  })

  socket.on("newUser", async (data)=>{
    const { senderId } = data;
    users[data.senderId] = socket.id
    io.emit("allUser", users)
  })

  socket.on('disconnect', async () => {
    console.warn(socket.id, 'Got disconnect');
    for (let user in users) {
      if (users[user] === socket.id) {
        delete users[user];
      }
    }
    io.emit("allUser", users);
  });
});

process.on('message', (message, connection) => {
  if (message !== 'sticky-session:connection') return;
  server.emit('connection', connection);
  connection.resume();
});

process.on('uncaughtException', (uncaughtExc) => {
  console.error(chalk.bgRed('UNCAUGHT EXCEPTION! 💥 Shutting down...'));
  console.error('uncaughtException Err::', uncaughtExc);
  console.error('uncaughtException Stack::', JSON.stringify(uncaughtExc.stack));
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error(chalk.bgRed('UNHANDLED PROMISE REJECTION! 💥 Shutting down...'));
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.info('💥 Process terminated!');
  });
});

server.listen(envConstants.APP_PORT || 4000, () => {
  console.info(chalk.blue(`Server & Socket listening on port ${envConstants.APP_PORT}!`));
});

module.exports = io;
