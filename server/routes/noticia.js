const express = require('express');
const app = express();
const axios = require('axios');
const {sentData} = require('../rabbitMQ/rabbit');

app.get('/noticias/news',async (req, res)=> {
    try{
        let apiKey = "38d810cb7aec47adbd73a988ba6cc09e";
        let url = `https://newsapi.org/v2/top-headlines?country=co&apiKey=${apiKey}`;

        let consulta = await axios.get(url);
        let data = consulta.data;
        return res.status(200).json(data.articles);
    }catch(error){
        console.log(error);
    }
});

app.get('/noticias/news/:categoria',async (req, res)=> {
    try{
        let apiKey = "38d810cb7aec47adbd73a988ba6cc09e";
        let categoria = req.params.categoria;
        let category = traducirCategoria(categoria);
        let url = `https://newsapi.org/v2/top-headlines?country=co&category=${category}&apiKey=${apiKey}`;

        let consulta = await axios.get(url);
        let data = consulta.data;
        let json_string = JSON.stringify(data);
        sentData(json_string).then(mensaje=>{
            res.status(200).json({
                res: mensaje
            });
        }).catch(error=>{
            console.log(error);
            res.status(400).json({
                res: "no se pudo realizar petición"
            });
        });
    }catch(error){
        console.log(error);
    }
});

let traducirCategoria = (categoria) =>{
    let category = "";
    if(categoria=="deportes"){
        category = "sports";
    }
    if(categoria=="entretenimiento"){
        category = "entertainment";
    }
    if(categoria=="tecnologia"){
        category = "technology";
    }
    return category;
}

module.exports = app;