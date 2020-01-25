var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminsRouter = require('./routes/admins');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var questionsRouter = require('./routes/questions');


var app = express();

// connect to db

mongoose.connect("mongodb://localhost/rakesh-api",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(err) console.log(err);
    else console.log("connect to db")
})



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/admins',adminsRouter);
app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/questions',questionsRouter);



module.exports = app;
