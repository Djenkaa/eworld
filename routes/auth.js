var express = require('express');
var router = express.Router();
const auth = require('../controllers/auth');

// GET login page
router.get('/', auth.logIn);
//POST register
router.post('/register', auth.register);
//POST login
router.post('/login', auth.loginAuth);


module.exports = router;