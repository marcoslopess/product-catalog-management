const amqp = require("amqplib");

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
    const channel = await connection.createChannel();
    return { connection, channel };
  } catch (error) {
    console.error("Failed to connect to RabbitMQ", error);
    throw error;
  }
};

module.exports = connectRabbitMQ;
