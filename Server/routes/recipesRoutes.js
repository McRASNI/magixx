var router = require('express').Router();
var recipesController = require('../controllers/recipesController');

router.get('/',recipesController.getRecipes);

module.exports = router;