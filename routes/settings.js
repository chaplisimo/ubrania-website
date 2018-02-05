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


router.post('/measureList', settings_controller.articleMeasuresList);
router.post('/measureAdd', settings_controller.articleMeasuresAdd);
router.post('/measureEdit', settings_controller.articleMeasuresEdit);
router.post('/measureRemove', settings_controller.articleMeasuresRemove);

module.exports = router;