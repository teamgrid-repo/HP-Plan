const mongoose = require('mongoose');
const { envConstants } = require('../helpers/constants');
const fs = require('fs');
const file = fs.readFileSync("rds-combined-ca-bundle.pem")

const connectionObj = {
  auth: {
    user: envConstants.DB_USER,
    password: envConstants.DB_PASS,
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

if (envConstants.AUTHENTICATION === 'false') delete connectionObj.auth;

let url
let connectToDB
if(envConstants.NODE_ENV === 'staging'){
  url = envConstants.URL
}else{
  connectToDB = async () => mongoose.connect(`${envConstants.DB_DIALECT}://${envConstants.DB_HOST}:${envConstants.DB_PORT}/${envConstants.DB_NAME}`, connectionObj);
}

exports.connect = async () => {
  mongoose.Promise = global.Promise;
  mongoose.set('debug', envConstants.DB_DEBUG_MODE === 'true');
  try {
    if(envConstants.NODE_ENV === 'development'){
      await mongoose.connect(envConstants.URL, connectionObj).then(()=>{
        console.info('Successfully connected to the database');
      })
    }else{
      await mongoose.connect(envConstants.URL,{
        ssl: true,
        sslValidate: true,
        sslCA: file,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(()=>{
        console.info('Successfully connected to the database');
      })
    }
  } catch (error) {
    console.error('Could not connect to the database. Exiting now...', error);
    process.exit();
  }
};

exports.disconnect = async () => {
  mongoose.Promise = global.Promise;
  await mongoose.disconnect();
};

exports.removeDB = async () => {
  await connectToDB();
  const { connection } = mongoose;
  connection.once('open', async () => {
    console.warn(`Our Current Database Name : ${connection.db.databaseName}`);
    mongoose.connection.db.dropDatabase(console.info(`${connection.db.databaseName} database dropped.`));
  });
};
