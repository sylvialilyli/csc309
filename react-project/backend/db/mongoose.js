const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI || 'mongodb+srv://root:root1234@cluster0-gsdqy.gcp.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/RestaurantAPI', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});


module.exports = { mongoose }