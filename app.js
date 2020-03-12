var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var couponsRouter = require('./routes/coupons');
var initDb = require('./db');

var app = express();

initDb();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/coupons', couponsRouter);

module.exports = app;
