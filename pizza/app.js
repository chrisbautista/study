var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = function(routes, debug){

  var app = express();

  app.locals.moment = require('moment');

  debug = debug || false;

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  var uri = 'mongodb://localhost/chrisb';
  mongoose.connect(uri, function(err) {
      if (err) {
          console.log('MongoDB connection error. Exiting...');
          process.exit(1);
      }
  });

  //Close the connection on exiting the process
  process.on('SIGINT', function() {
      mongoose.connection.close(function() {
          console.log('Mongoose connection disconnected through app termination');
          process.exit(0);
      });
  });

  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use(function(req,res,next){
      res.setHeader('X-Powered-By', 'Pizza Shop');
      next();
  }); 

  app.use('/', routes);


  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  return app;

};



module.exports = app;
