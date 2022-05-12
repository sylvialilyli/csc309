const {
    createLogger,
    transports,
    format
} = require('winston');

require('winston-mongodb').MongoDB;

const logger = createLogger({
    transports: [
        //logger for errors
      new transports.MongoDB({
        db: process.env.ATLAS_URI || 'mongodb+srv://root:root1234@cluster0-gsdqy.gcp.mongodb.net/logger?retryWrites=true&w=majority',
        collection : 'error_logger',
        level: 'error',
        options: {
          useUnifiedTopology: true
        }
       }),
       new transports.MongoDB({
           //logger for basic info
        db: process.env.ATLAS_URI || 'mongodb+srv://root:root1234@cluster0-gsdqy.gcp.mongodb.net/logger?retryWrites=true&w=majority',
        collection : 'logger',
        level: 'info',
        options: {
          useUnifiedTopology: true
        }
       }),
    //   new transports.File({
    //     filename: "error.log",
    //     level: "error",
    //     format: format.combine(format.timestamp(), format.json())
    //   }),
        new transports.File({
        filename: "info.log",
        level: "info",
        format: format.combine(format.timestamp(), format.json())
      })
    ]
  });
  module.exports = logger;