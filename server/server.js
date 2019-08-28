require('./config/config');
const express = require('express');
const app = express();
const Noticia = require("./routes/noticia");


const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//app.use(require('./routes/routes'));

setInterval(()=>{
    console.log("enviando...");
    Noticia.getNews();
},15000);

app.listen(process.env.PORT,()=>{
    console.log(`Server ON puerto ${process.env.PORT}`);
});