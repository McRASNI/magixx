var recipe = require('../model/recipesSchema.js').recipe;
var mongoose = require('mongoose');
var MONGO_URI = 'mongodb://localhost:27017/Magix';
mongoose.connect(MONGO_URI);


var newRecipe = new recipe(
    {
        name : 'love cookies',
        date : new Date() ,
        rate : 3,
        content : "make chocolate cookie with love"
    }
)

newRecipe.save(function(err){
    if(err){
        console.log(err);
    }
    else
        console.log("Success!");
});
