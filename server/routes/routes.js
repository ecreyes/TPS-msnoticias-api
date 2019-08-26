const express = require('express');
const app = express();

app.use(require('./noticia').app);

module.exports = app;