var Order = require('../model/User').Order;

// Populating straight away on the same query
Order.findById(1234).populate([{path:'userID', select:'name date'}, {path:'groups', select:'name location'}]).exec(function(err,user){
    // Kill Something
});

// Querying for users then populating
User.find({},function(err,users){
    User.populate(users,[{path:'orders', select:'name date'}, {path:'groups', select:'name location'}],function(err,users){
        // Do Something
    })
});

// Populate all orders for all users without selecting
User.find().populate('orders').exec(function(err,users){
    // Do Something
});
