//router para carrito
//cart.js

var express = require('express');
var router = express.Router();

var article_controller = require('../controllers/article_controller.js');

router.get('/', article_controller.index);
router.post('/', article_controller.index);

router.post('/addToCart', article_controller.article_add);

router.post('/removeFromCart', article_controller.article_remove);

module.exports = router;