const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('./routes')(app);


module.exports = app;
