var mongoose = require("mongoose");

var recipesSchema = new mongoose.Schema({
    name : {type:String, required:true},
    date : {type:Date },
    rate : {type:Number, default:0},
    content : {type:String,required:true}
});

recipesSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
    }
});

module.exports.recipe = mongoose.model('recipes',recipesSchema);