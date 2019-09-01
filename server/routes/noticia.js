const axios = require('axios');
const { sentData } = require('../rabbitMQ/rabbit');
const Translate = require("./translate");

let getByCategoria = async (rcategoria) => {
    try {
        let apiKey = process.env.NEWSAPI;
        let categoria = rcategoria;
        let category = Translate.traducirCategoria(categoria);
        let url = `https://newsapi.org/v2/top-headlines?country=co&category=${category}&apiKey=${apiKey}`;

        let consulta = await axios.get(url);
        let data = consulta.data.articles;
        let noticias = [];
        for(var i=0; i<data.length;i++){
            noticia = data[i];
            objetoNoticia = {
                titular:"sin titular",
                descripcion: "sin descripcion",
                autor: "sin autor",
                url: "sin url",
                fuente: "sin fuente",
                categoria: rcategoria
            };
            if(noticia.author){
                objetoNoticia.autor = noticia.author;
            }
            if(noticia.title){
                objetoNoticia.titular = noticia.title;
            }
            if(noticia.description){
                objetoNoticia.descripcion = noticia.description
            }
            if(noticia.url){
                objetoNoticia.url = noticia.url;
            }
            if(noticia.source.name){
                objetoNoticia.fuente = noticia.source.name
            }
            noticias.push(objetoNoticia);
        }
        let json_string = JSON.stringify(noticias);
        sentData(json_string).then(mensaje => {
            console.log(mensaje);
        }).catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getByCategoria
};