import { createClient } from 'redis';

const host = '127.0.0.1';
const port = 6379;

const client = createClient({
	socket: {
		host: host,
		port: port
	}
});

client.on('connect', () => {
	console.log('Redis client connected to the server');
});

client.on('error', (error) => {
	console.log(`Redis client not connected to the server: ${error.message}`);
});

(async () => {
	await client.connect();
})();

function publishMessage(message, time) {
	setTimeout(() => {
		console.log(`About to send ${message}`);
		client.publish('holberton school channel', message, (err) => {
		  if (err) {
		    console.error(err.message);
		  }
		});
	}, time);
}


publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
