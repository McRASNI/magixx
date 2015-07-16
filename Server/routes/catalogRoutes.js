var router = require('express').Router();
var catalogController = require('../controllers/catalogController');

router.get('/',catalogController.getCatalog);

module.exports = router;