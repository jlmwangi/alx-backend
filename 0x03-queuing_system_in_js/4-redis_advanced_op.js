import { createClient, print } from 'redis';

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

//client.connect();

(async () => {
  try {
    await client.connect();

    const fields = {
      Portland: "50",
      Seattle: "80",
      "New York": "20",
      Bogota: "20",
      Cali: "40",
      Paris: "2"
    };
    for (const [key, value] of Object.entries(fields)) {
      const reply = await client.hSet("HolbertonSchools", key, value)
      console.log(`Reply: ${reply}`);
    }

    const schools = await client.hGetAll("HolbertonSchools");
    console.log(schools);
  } catch (err) {
    console.error(err.message);
  }
})();
