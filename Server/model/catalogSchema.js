var mongoose = require("mongoose");

var catalogSchema = new mongoose.Schema({
    name : {type:String , required:true},
    description : {type:String },
    price : {type:Number , required:true},
    quantity : {type:Number , default:0},
    picture : { type: mongoose.Schema.Types.ObjectId, ref: 'fs.files' }
});

catalogSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
    }
});

module.exports.catalog = mongoose.model('catalog',catalogSchema);