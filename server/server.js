require('./config/config');
const express = require('express');
const app = express();
const Noticia = require("./routes/noticia");


const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//mitigación de vulnerabilidad owasp
app.disable('x-powered-by');

//mitigación de vulnerabilidad xss owasp
const xssFilter = require('x-xss-protection');
app.use(xssFilter());

//mitigación de vuelnerabilidad csp owasp
const csp = require('helmet-csp');

app.use(csp({
  // Specify directives as normal.
  directives: {
    defaultSrc: ["'self'", 'default.com'],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ['style.com'],
    fontSrc: ["'self'", 'fonts.com'],
    imgSrc: ['img.com', 'data:'],
    sandbox: ['allow-forms', 'allow-scripts'],
    reportUri: '/report-violation',
    objectSrc: ["'none'"],
    upgradeInsecureRequests: true,
    workerSrc: false  // This is not set.
  },
 
  // This module will detect common mistakes in your directives and throw errors
  // if it finds any. To disable this, enable "loose mode".
  loose: false,
 
  // Set to true if you only want browsers to report errors, not block them.
  // You may also set this to a function(req, res) in order to decide dynamically
  // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
  reportOnly: false,
 
  // Set to true if you want to blindly set all headers: Content-Security-Policy,
  // X-WebKit-CSP, and X-Content-Security-Policy.
  setAllHeaders: false,
 
  // Set to true if you want to disable CSP on Android where it can be buggy.
  disableAndroid: true,
 
  // Set to false if you want to completely disable any user-agent sniffing.
  // This may make the headers less compatible but it will be much faster.
  // This defaults to `true`.
  browserSniff: false
}));

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