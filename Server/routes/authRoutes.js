var router = require('express').Router();
var authController = require('../controllers/authController');

router.get('/',authController.checkLogin);

module.exports = router;