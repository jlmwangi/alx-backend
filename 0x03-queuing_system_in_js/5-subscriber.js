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

// subscribe to a channel
(async () => {
	try {
		await client.connect();

		await client.subscribe('holberton school channel', (message, channel) => {
			console.log(message);

			if (message === 'KILL_SERVER') {
				client.unsubscribe();
				client.quit();
			}
		});
	} catch (err) {
		console.log(`${err.message}`);
	}
})();
