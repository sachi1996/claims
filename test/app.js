var mysql = require('mysql');
const express = require('express');
const fileUpload = require('express-fileupload');
var app = express();
const bodyparser = require('body-parser');
var cors = require('cors');

var claim = require('./routes/claimDetails');

app.use(bodyparser.json());
app.use(fileUpload());
 
app.use(
  cors()
);

app.use('/', claim);

console.log('Get connection ...');

app.listen(3002, () => console.log("Express server is running at port no : 3002"));

let claimDetails = [];

/////////////////////////////////////////////////////////////////////
