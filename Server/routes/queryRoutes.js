var router = require('express').Router();
var queryController = require('../controllers/queryController');

router.get('/productName',queryController.getQuery);

module.exports = router;