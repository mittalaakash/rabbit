const express = require('express');
const { initializeQueue, consumeQueue } = require('./rabbitmq/connect');

const app = express();
const PORT = process.env.PORT || 4003;

(async () => {
  await initializeQueue();
  consumeQueue('todo-queue', data => {
    console.log(`Server[${PORT}]:${Buffer.from(data.content)}`);
  });
})();

app.use(express.json());
app.listen(PORT, () => console.log('Server running at port ' + PORT));
