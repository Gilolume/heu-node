//Import
const express = require('express');
const bodyParser = require('body-parser');

//Init
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-token, Content-Type, Accept");
    next();
  });

//Import routes
require('./utils')(app);

app.get('/', function(req, res) {
    res.send("Hello !");
});

app.listen(80, function () {
    console.log('Example app listening on port 80');
});