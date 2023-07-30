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
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book', bookRouter);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//404 Handler
app.use((req, res, next)=>{
  let error = new Error();
  error.message = "Error: Page not found"
  error.status = 404
  console.log("in the 404 Handler")

  next(error)
})

//Global Error Handler
app.use((req, res, error)=>{

  if(!error.status && !error.message){
    error.status = 500
    error.message = 'Opps...Sever Error'
  }

  console.log(error.message)
})

module.exports = app;
