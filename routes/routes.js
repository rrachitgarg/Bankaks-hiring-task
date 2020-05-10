const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.js');

// console.log('hafyg');

router.post('/signup',auth.signup);
router.post('/signin',auth.signin);
router.post('/addContact',auth.addContact);

module.exports = router;