var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var couponsRouter = require('./routes/coupons');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/coupons', couponsRouter);

module.exports = app;
