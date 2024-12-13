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

client.connect();

//(async () => {
//  try {
//    await client.connect();

//    async function setNewSchool(schoolName, value) {
//	    client.set(schoolName, value, print);
//    }
//    async function displaySchoolValue(schoolName) {
//	    const value = await client.get(schoolName);
//	    console.log(`${value}`);
//    }
//    displaySchoolValue('Holberton');
//    setNewSchool("HolbertonSanFrancisco", "100");
//    displaySchoolValue("HolbertonSanFrancisco");

//  } catch (error) {
//    console.log(`Redis client not connected to the server: ${error.message}`);
//  }
//})();

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (err, reply) => {
    if (err) {
      console.error(`Error: ${err.message}`)
    } else {
      console.log(`Reply: ${reply.status}`);
    }
  });
}

async function displaySchoolValue(schoolName) {
  const value = await client.get(schoolName);
  console.log(`${value}`);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
