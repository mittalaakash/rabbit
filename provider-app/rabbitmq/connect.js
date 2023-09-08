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

async function sendData(queueName, data) {
  try {
    await channel.assertQueue(queueName);
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  } catch (error) {
    console.error(`Error in consuming queue:${queueName}`, error);
  }
}

module.exports = {
  initializeQueue,
  sendData,
};
