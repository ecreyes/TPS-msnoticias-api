const express = require('express');
const app = express();
const axios = require('axios');
const { sentData } = require('../rabbitMQ/rabbit');
const amqp = require('amqplib/callback_api');
const Translate = require("./translate");


amqp.connect(process.env.RABBITMQ, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'api_exchange';

        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        channel.assertQueue('api_request', {
            exclusive: false
        }, function (error2, q) {
            if (error2) {
                throw error2;
            }
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            channel.bindQueue(q.queue, exchange, '');

            channel.consume(q.queue, function (msg) {
                if (msg.content) {
                    console.log(msg.content.toString());
                    if(msg.content.toString()=="deportes"){
                        getByCategoria("deportes");
                    }
                    if(msg.content.toString()=="news"){
                        getNews();
                    }
                }
            }, {
                    noAck: true
                });
        });
    });
});

let getNews = async ()=>{
    try {
        let apiKey = "38d810cb7aec47adbd73a988ba6cc09e";
        let url = `https://newsapi.org/v2/top-headlines?country=co&apiKey=${apiKey}`;

        let consulta = await axios.get(url);
        let data = consulta.data.articles;
        let json_string = JSON.stringify(data);
        sentData(json_string).then(mensaje => {
            console.log(mensaje);
        }).catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
};


let getByCategoria = async (rcategoria) => {
    try {
        let apiKey = "38d810cb7aec47adbd73a988ba6cc09e";
        let categoria = rcategoria;
        let category = Translate.traducirCategoria(categoria);
        let url = `https://newsapi.org/v2/top-headlines?country=co&category=${category}&apiKey=${apiKey}`;

        let consulta = await axios.get(url);
        let data = consulta.data.articles;
        let json_string = JSON.stringify(data);
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
    app
};