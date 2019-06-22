var express = require('express');
var router = express.Router();

var markdown_controller = require('../controllers/markdown/markdownController');

router.get('/test', markdown_controller.test);

router.post('/', markdown_controller.markdown_create);

router.get('/:id', markdown_controller.markdown_findById);
router.get('/', markdown_controller.markdown_findAll);

router.put('/:id', markdown_controller.markdown_update);

router.delete('/:id', markdown_controller.markdown_delete);

module.exports = router;