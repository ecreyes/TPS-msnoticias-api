const assert = require('chai').assert;
const amqp = require('amqplib/callback_api');


describe("Prueba de integración rabbitmq",function(){

    it("recepción de mensajes",async function(){
        this.timeout(100000);
        let respuesta = 0;
        msg =await conn();
        respuesta = msg;
        assert.deepEqual(respuesta>0,true);
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
                var exchange = 'api_exchange';
        
                channel.assertExchange(exchange, 'fanout', {
                    durable: false
                });
        
                channel.assertQueue('noticia_request_cud', {
                    exclusive: false
                }, function (error2, q) {
                    if (error2) {
                        throw error2;
                    }
                    channel.bindQueue(q.queue, exchange, '');
        
                    channel.consume(q.queue, function (msg) {
                        if (msg.content) {
                            console.log(msg.content.toString());
                            resolve(msg.content.length);
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