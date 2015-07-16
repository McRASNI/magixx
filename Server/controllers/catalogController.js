var catalog = require('../model/catalogSchema').catalog;

exports.getCatalog = function(req,res,next){
    catalog.find({},function(err,catalogs){
        if(err)
            next(err);
        res.json(catalogs);
    })
};