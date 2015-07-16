var users = require('../model/userSchema').user;


exports.checkLogin = function(req,res,next){
    console.log("in auth controller mongo");
    var userName = req.query.user;
    var password = req.query.password;
    console.log(userName+":"+password);
    //to add validations
    users.findOne({$or:[{userName:userName},{email:userName}], password: password},function(err,user){
        if(err)
            next(err);
        else if(!user)
            next(new Error("Could not find user"));
        else {
            console.log(user);
            res.json(user);
        }
    })
};