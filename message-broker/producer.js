// Producing --> activities that sending a message.
// Producer  --> people or programs that send a message.

const amqp = require('amqplib');

const init = async () => {
  // Make a connection to RabbitMQ server.
  const connection = await amqp.connect('amqp://localhost');
  
  // Used to call the API
  const channel = await connection.createChannel();

  // Define a name of the queue destination.
  const queue = 'dicoding';
  const message = 'Happy learning message broker!';

  // Make sure the queue name has been created.
  await channel.assertQueue(queue, {
    durable: true,
  });

  // Sending/produce a message.
  await channel.sendToQueue(queue, Buffer.from(message));
  console.log('Message successfully sent!');

  // Best practice: close the connection after sending a message.
  setTimeout(() => {
    connection.close();
  }, 1000);
}

init();