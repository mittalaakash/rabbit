const express = require('express');

const { initializeQueue, sendData } = require('./rabbitmq/connect');

const app = express();
const PORT = process.env.PORT || 8000;

initializeQueue();

let message = 0;
let todo = 0;
let task = 0;

app.use(express.json());

app.get('/send-message', (req, res) => {
  sendData('message-queue', `message number ${++message}`);
  console.log('A message has been added to the queue');
  res.send('Message Added');
});

app.get('/send-task', (req, res) => {
  sendData('task-queue', `task number ${++task}`);
  console.log('A task has been added to the queue');
  res.send('task Added');
});

app.get('/send-todo', (req, res) => {
  sendData('todo-queue', `todo number ${++todo}`);
  console.log('A todo has been added to the queue');
  res.send('todo Added');
});

app.listen(PORT, () => {
  console.log('Server is alive!');
});
