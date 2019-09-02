const assert = require('chai').assert;
const amqp = require('amqplib/callback_api');


describe("Prueba de integración rabbitmq",function(){

    it("recepción de mensajes",async function(){
        this.timeout(100000);
        objetoNoticia = {
            titular:"titular",
            descripcion: "descripcion",
            autor: "autor",
            url: "url",
            fuente: "fuente",
            categoria: "categoria"
        };
        data = await sentData(JSON.stringify(objetoNoticia));
        msg = await conn();
        assert.deepEqual(msg.titular,"titular");
        assert.deepEqual(msg.descripcion,"descripcion");
        assert.deepEqual(msg.autor,"autor");
        assert.deepEqual(msg.url,"url");
        assert.deepEqual(msg.fuente,"fuente");
        assert.deepEqual(msg.categoria,"categoria");
        data.close();
    });
  
  });


  let conn = function(){
      return new Promise((resolve,reject)=>{
        amqp.connect("amqp://xuueptgg:hYmOJdYsGPSSW-rvY_WSRXB1OK2YW8II@fox.rmq.cloudamqp.com/xuueptgg", function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                var exchange = 'it_exchange';
        
                channel.assertExchange(exchange, 'direct', {
                    durable: false
                });
        
                channel.assertQueue('it_test_cola', {
                    exclusive: false
                }, function (error2, q) {
                    if (error2) {
                        throw error2;
                    }
                    channel.bindQueue(q.queue, exchange, 'it_ruta');
                    console.log("esperando respuesta...");
                    channel.consume(q.queue, function (msg) {
                        if (msg.content) {
                            console.log(msg.content.toString());
                            resolve(JSON.parse(msg.content));
                            connection.close();
                        }
                    }, {
                            noAck: true
                        });
                });
            });
        });
          

      });
}


let sentData = (data) => {
    return new Promise((resolve, reject) => {

        amqp.connect("amqp://xuueptgg:hYmOJdYsGPSSW-rvY_WSRXB1OK2YW8II@fox.rmq.cloudamqp.com/xuueptgg", function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                var exchange = 'it_exchange';
                var msg = data;
                var severity = 'info';

                channel.assertExchange(exchange, 'direct', {
                    durable: false
                });
                channel.publish(exchange,"it_ruta", Buffer.from(msg));
                console.log(msg);
                resolve(connection);
            });
        });

    });

};
