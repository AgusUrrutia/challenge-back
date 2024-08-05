const express = require('express');
const router = express.Router();
const { getAll, post, update } = require('../controllers/plantaController');
const upload = require('../middleware/multer');
const auth = require('../middleware/token');
router.get('/all', upload.none(),auth, getAll);
router.post('/', upload.none(),auth, post);
router.post('/:id', upload.none(),auth, update);

module.exports = router;
