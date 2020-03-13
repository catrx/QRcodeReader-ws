var express = require('express');
var indexRouter = require('./routes/index');
var couponsRouter = require('./routes/coupons');
var initDb = require('./db');

var app = express();

initDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/coupon', couponsRouter);

module.exports = app;
