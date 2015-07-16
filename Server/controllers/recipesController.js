var recipes = require('../model/recipesSchema').recipe;

exports.getRecipes = function(req,res,next){
    recipes.find({},function(err,recipes){
        if(err)
            next(err);
        res.json(recipes);
    })
};
