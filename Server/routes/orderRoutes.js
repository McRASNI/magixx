var router = require('express').Router();
var orderController = require('../controllers/orderController');

router.get('/',orderController.getOrder);
router.get('/getOrderByUserID',orderController.getOrderByUserID);

module.exports = router;