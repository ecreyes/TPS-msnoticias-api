const express = require('express');
const app = express();

app.use(require('./noticia'));

module.exports = app;