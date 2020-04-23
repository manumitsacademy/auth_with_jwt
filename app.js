var express = require('express');
var app = express();
var cors = require('cors')
var db = require('./db');
app.use(cors())
global.__root   = __dirname + '/'; 

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var UserController = require(__root + 'user/UserController');
app.use('/api/users', UserController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

var StudentController = require(__root + 'student/StudentController');
app.use('/api/student', StudentController);
module.exports = app;