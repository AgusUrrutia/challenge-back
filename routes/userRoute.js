const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const upload = require('../middleware/multer');

router.post('/register', upload.none(), register); // Usar upload.none() si no se suben archivos
router.post('/login', upload.none(), login);

module.exports = router;
