var catalog = require('../model/catalogSchema.js').catalog;
var mongoose = require('mongoose');
var MONGO_URI = 'mongodb://localhost:27017/Magix';
mongoose.connect(MONGO_URI);


var newProduct = new catalog(
    {
        name : 'killing potion',
        description : 'Will kill someone how drinks it',
        price : 500,
        quantity : 1,
        picture : null
    }
)

newProduct.save(function(err){
    if(err){
        console.log(err);
    }
    else
        console.log("Success catalog product!");
});
