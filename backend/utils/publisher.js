const connectRabbitMQ = require("./rabbitmq");

const publishMessage = async (message) => {
  const { channel } = await connectRabbitMQ();
  const queue = "catalog-emit";
  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  console.log("Message published:", message);
};

module.exports = publishMessage;
