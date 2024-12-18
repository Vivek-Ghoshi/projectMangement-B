const mongoose = require('mongoose');

const mongoUri = process.env.MONGOURI;

mongoose.connect(mongoUri,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(function(){
    console.log("connected to db")
})
.catch(function(err){
    console.log(err.message)
});

const db = mongoose.connection;

module.exports = db;