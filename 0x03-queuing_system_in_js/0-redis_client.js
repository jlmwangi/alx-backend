import { createClient } from 'redis';

const host = '127.0.0.1';
const port = 6379;

const client = createClient({
  socket: {
    host: host,
    port: port,
  },
});

client.on('connect', () => {
	console.log("Redis client connected to the server");
});

client.on("error", (err) => {
	console.log(`Redis client not connected to the server: ${err.message}`);
});

(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.log(`Redis client not connected to the server: ${error.message}`);
  }
})();
