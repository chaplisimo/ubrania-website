//router para settings
//settings.js

var express = require('express');
var router = express.Router();


var settings_controller = require('../controllers/settings_controller.js');

router.get('/', settings_controller.index);
router.post('/', settings_controller.index);

router.get('/articleList', settings_controller.articleList);

router.get('/articleNew', settings_controller.articleNew);
router.post('/articleAdd', settings_controller.articleAdd);

module.exports = router;