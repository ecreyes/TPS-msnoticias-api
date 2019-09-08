require('./config/config');
const express = require('express');
const app = express();
const Noticia = require("./routes/noticia");


const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//mitigación de vulnerabilidad
app.disable('x-powered-by');

//mitigación de vulnerabilidad xss
const xssFilter = require('x-xss-protection')
app.use(xssFilter())

if(process.env.MODE!="test"){
    console.log("MODO PRODUCCIÓN");
    setInterval(()=>{
        console.log("enviando noticias");
        Noticia.getAllnoticias();
    },15000);
}else{
    console.log("MODO TESTING ZAP OWASP");
}

app.listen(process.env.PORT,()=>{
    console.log(`Server ON puerto ${process.env.PORT}`);
});