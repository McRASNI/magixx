var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var app = express();

var apiCatalogRoutes = require('./routes/catalogRoutes');
var apiOrderRoutes = require('./routes/orderRoutes');
var apiQueryRoutes = require('./routes/queryRoutes');
var apiRecipesRoutes = require('./routes/recipesRoutes');
var apiAuthRoutes = require('./routes/authRoutes');
// view engine setup
app.set('views',path.join(__dirname, "../","Client"));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(express.static(path.join(__dirname, "../","Client")));
// API Routes
app.use('/api/catalog',apiCatalogRoutes);
app.use('/api/order',apiOrderRoutes);
app.use('/api/query',apiQueryRoutes);
app.use('/api/recipes',apiRecipesRoutes);
app.use('/api/auth',apiAuthRoutes);
// extras
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(err,req,res,next){
    console.log(err);
    res.status(500).send({error:err.message});
});
module.exports = app;
