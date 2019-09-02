const axios = require('axios');
const { sentData } = require('../rabbitMQ/rabbit');
const Translate = require("./translate");

let getAllnoticias = async () => {
    try {
        let categorias = ["entretenimiento","tecnologia","negocios","general","salud","ciencia"];
        let noticias_arreglos = [];
        let noticias = [];
        for(var i=0;i<categorias.length;i++){
            noticia_list = await getNoticias(categorias[i]);
            noticias_arreglos.push(noticia_list);
        }
        for(var i=0; i<noticias_arreglos.length;i++){
            for(var j=0; j<noticias_arreglos[i].length;j++){
                noticias.push(noticias_arreglos[i][j]);
            }
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


let getNoticias = async (rcategoria)=>{
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
    return noticias;
};

module.exports = {
    getAllnoticias
};