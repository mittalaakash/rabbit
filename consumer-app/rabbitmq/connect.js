const amqp = require('amqplib');

let channel, connection;

async function initializeQueue() {
  try {
    connection = await amqp.connect('amqp://127.0.0.1:5672');
    channel = await connection.createChannel();
  } catch (error) {
    console.error('Error in connecting rabbitMQ', error);
  }
}

async function consumeQueue(queueName, fn) {
  try {
    await channel.assertQueue(queueName);

    channel.consume(queueName, data => {
      fn(data);
      channel.ack(data);
    });
  } catch (error) {
    console.error(`Error in consuming queue:${queueName}`, error);
  }
}

module.exports = {
  initializeQueue,
  consumeQueue,
};
