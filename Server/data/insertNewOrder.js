var order = require('../model/orderSchema.js').order;
var mongoose = require('mongoose');
var MONGO_URI = 'mongodb://localhost:27017/Magix';
mongoose.connect(MONGO_URI);


var neworder = new order({
    user : "5597f5961ee61f2036bedc6f",
    totalPrice : 990,
    orderDate : new Date(),
    totalQuantity : 3,
    products : [{
        product: "5597f581d618cf0d36938f7a",
        quantity:2
    },
        {
            product: "5597f581d618cf0d36938f7a",
            quantity:1
        }]
    }
)

neworder.save(function(err){
    if(err){
        console.log(err);
    }
    else
        console.log("Success!");
});
