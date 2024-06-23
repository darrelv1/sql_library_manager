const express = require('express');
const router = express.Router();
const Books = require('../models/index').Book


/* GET home page. */
router.get('/', async (req, res, next) =>{


  res.redirect('/books')

});



module.exports = router;
