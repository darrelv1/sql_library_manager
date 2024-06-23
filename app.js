const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bookRouter  = require('./routes/book')

const app = express();

// const sequelize = require('./models/index');
// console.log(`${Object.keys(sequelize)}`);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', bookRouter);


//404 Handler
// app.use((req, res, next)=>{
//   let error = new Error();
//   error.message = "Error: Page not found"
//   error.status = 404
//   console.log("in the 404 Handler")
//   res.render('not_found', {error})
// })

//Global Error Handler
app.use((req, res, error)=>{

  if(!error.status && !error.message){
    error.status = 500
    error.message = 'Sorry! There was an unexpected error on the server.'
  }

  console.log(error.message)

  res.render('error', {error})
})

module.exports = app;
