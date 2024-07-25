const connectRabbitMQ = require("./rabbitmq");
const db = require("../config/database").pool;

const consumeMessages = async () => {
  const { channel } = await connectRabbitMQ();
  const queue = "catalog-emit";
  await channel.assertQueue(queue);
  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const message = JSON.parse(msg.content.toString());
      console.log("Received message:", message);
      if (message.type === "CREATE_PRODUCT") {
        const { productId, title, description, price, categoryId, ownerId } = message.payload;
        const category = categoryId
          ? await db.execute("SELECT title FROM categories WHERE id = ?", [categoryId])
          : undefined;
        const query = `INSERT INTO flat_catalog (productId, productName, productDescription, productPrice, categoryId,categoryName, ownerId) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const data = [
          productId,
          title,
          description,
          price,
          categoryId,
          category ? category[0][0].title : null,
          ownerId,
        ];
        await db.execute(query, data);
      }
      if (message.type === "UPDATE_PRODUCT") {
        const { productId, title, description, price, categoryId } = message.payload;
        const category = categoryId
          ? await db.execute("SELECT title FROM categories WHERE id = ?", [categoryId])
          : undefined;
        const query = `
        UPDATE flat_catalog SET
          productName = ?,
          productDescription = ?,
          productPrice = ?,
          categoryId = ?,
          categoryName = ?
        WHERE productId = ?
      `;
        const data = [title, description, price, categoryId, category ? category[0][0].title : null, productId];
        await db.execute(query, data);
      }

      if (message.type === "UPDATE_CATEGORY") {
        const { categoryId, title } = message.payload;

        const query = `
          UPDATE flat_catalog SET
            categoryName = ?
          WHERE categoryId = ?
        `;
        const data = [title, categoryId];
        await db.query(query, data);
      }

      if (message.type === "DELETE_PRODUCT") {
        const { productId } = message.payload;

        const query = `
          DELETE FROM flat_catalog WHERE productId = ?
        `;
        const data = [productId];
        await db.query(query, data);
      }

      channel.ack(msg);
    }
  });
};

module.exports = consumeMessages;
