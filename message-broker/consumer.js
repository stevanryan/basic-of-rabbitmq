// Consuming --> activities that receive a message.
// Consumer  --> people or programs that receive a message.

const amqp = require('amqplib');

const init = async () => {
  // Make a connection to RabbitMQ server.
  const connection = await amqp.connect('amqp://localhost');
  
  // Used to call the API
  const channel = await connection.createChannel();

  // Define a name of the queue destination.
  const queue = 'dicoding';

  // Make sure the queue name has been created.
  await channel.assertQueue(queue, {
    durable: true,
  });

  // Receive/consume a message.
  await channel.consume(queue, (message) => {
    // message.content.toString() -> Read a content as a string.
    console.log(`Receive a message from queue ${queue}: ${message.content.toString()}`);
  }, {noAck: true});

  // noAck shows whether a message needs an acknowledgement or not
}

init();