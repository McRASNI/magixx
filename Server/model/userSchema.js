var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    userName : {type:String , required:true},
    firstName : {type:String , required:true},
    lastName : {type:String , required:true},
    email : {type: String , required:true},
    role : {type:String, enum:["admin", "user"], default:'user'},
    living : {type:String},
    password : {type:String}
});

userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
    }
});

module.exports.user = mongoose.model('user',userSchema);