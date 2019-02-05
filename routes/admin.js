var express = require('express');
var router = express.Router();
var controll = require('../controllers/application');

const {protect} = require('../middleware/authentication');
const {vreme} = require('../middleware/authentication');
 

/* GET home page. */
router.get('/',protect, controll.getHome);

// POST chat message
router.post('/chat-message', controll.postMessage);

// POST logout message
router.post('/logout', controll.logout);

// GET train page

router.get('/train',protect,vreme, controll.getTrain);

//POST train 

router.post('/train-workout',controll.postTrain);

//GET profile

router.get('/profile/:id',protect, controll.getProfile);


module.exports = router;
