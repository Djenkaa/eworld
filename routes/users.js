var express = require('express');
var router = express.Router();
var community = require('../controllers/community');
const {protect} = require('../middleware/authentication');


// GET users
router.get('/users',protect, community.getUsers);

//GET market 
router.get('/market',protect, community.getMarket);

//POST market
router.post('/market',protect, community.postMarket);

//GET storge
router.get('/battle',protect, community.getStorge);

//POST storge 
router.post('/battle',protect, community.postStorge);

//GET fight 
router.post('/fight',community.postFight);

module.exports = router;
