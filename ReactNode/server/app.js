'use strict';
var path = require('path');
var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello from our server!')
})

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('listening');
});