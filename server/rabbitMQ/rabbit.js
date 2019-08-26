const amqp = require('amqplib/callback_api');

let sentData = (data) => {
    return new Promise((resolve, reject) => {

        amqp.connect(process.env.RABBITMQ, function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                var exchange = 'noticia_exchange';
                var msg = data;
                var severity = 'info';

                channel.assertExchange(exchange, 'direct', {
                    durable: false
                });
                channel.publish(exchange,"noticia.lista", Buffer.from(msg));
                console.log(" [x] Sent %s: '%s'", severity, msg);
                //connection.close();
                return resolve("mensaje enviado");
            });
        });

    });

};


module.exports = {
    sentData
}