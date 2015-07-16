var user = require('../model/userSchema.js').user;
var mongoose = require('mongoose');
var MONGO_URI = 'mongodb://localhost:27017/Magix';
mongoose.connect(MONGO_URI);


var newUser = new user(
    {
        userName : "Nathy Gamrasni",
        firstName : "Nathy",
        lastName : "Gamrasni",
        email : "nathy@gmail.com",
        living : "Tel-Aviv, Israel, WAT",
        password : "1234",
        role : 'admin'
    }
)

newUser.save(function(err){
    if(err){
        console.log(err);
    }
    else
        console.log("Success!");
});
