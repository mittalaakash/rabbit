const express = require('express');

const { initializeQueue, consumeQueue } = require('./rabbitmq/connect');

const app = express();
const PORT = process.env.PORT || 4002;

(async () => {
  await initializeQueue();
  consumeQueue('task-queue', data => {
    console.log(`Server[${PORT}]:${Buffer.from(data.content)}`);
  });
})();

app.use(express.json());
app.listen(PORT, () => console.log('Server running at port ' + PORT));
