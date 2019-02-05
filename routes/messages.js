var express = require('express');
var router = express.Router();
var message = require('../controllers/messages');
const {protect} = require('../middleware/authentication');

// POST message

router.post('/message', message.postMessage);

//GET inbox

router.get('/inbox',protect, message.getInbox);

//GET alert

router.get('/alerts',protect, message.getAlert);

//POST replay

router.post('/replay', message.postReplay);

//POST delete inbox

router.post('/delete-inbox', message.postDeleteInbox);

//POST delete alerts

router.post('/delete-alert', message.postDeleteAlert);


module.exports = router;