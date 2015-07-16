var order = require('../model/orderSchema').order;
var users = require('../model/userSchema').user;
var catalog = require('../model/catalogSchema').catalog;
exports.getOrder = function(req,res,next){
    //TODO get user session is, get userID, get orders by userID
    //var user = req.query.userId;
    var user = "558558a601d1ea8015f8e88e";
    order.find({user:user},function(err,orders){
        if(err)
            next(err);
        res.json(orders);
    })
};


exports.getOrderByUserID = function(req,res,next) {
    //var user = req.query.id;
    console.log("Nathy2!");
    //user = "5585738773aed8001671d9ae";
    user = "558558a601d1ea8015f8e88e";
// Populating straight away on the same query
    order.find({user:user}).populate([{path:'user',select:'userName'},{path:'products.product',select:'name'}]).exec(function(err,order){
        if(err)
            next(err);
        console.log(order);
        res.json(order);

    });
    //
    //order.findById(user).populate([{path:'userID', select:'name date'}, {path:'groups', select:'name location'}]).exec(function(err,user){
    //    // Kill Something
    //});




};