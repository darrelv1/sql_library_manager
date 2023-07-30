const express = require('express');
const router = express.Router();
const Book = require('../models/index').Book


/* GET home page. */
router.get('/', async (req, res, next) =>{

  res.render('layout', { title: 'Express', header: 'Library App' });
});



module.exports = router;
