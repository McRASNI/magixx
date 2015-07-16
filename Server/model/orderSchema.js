var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    user : {type:mongoose.Schema.Types.ObjectId, ref: 'user', required:true},
    totalPrice : {type:Number },
    orderDate : {type:Date},
    totalQuantity : {type:Number, default:0},
    products : [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'catalog'},
        quantity: {type:Number}
    }]
});

orderSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
    }
});

module.exports.order = mongoose.model('order',orderSchema);