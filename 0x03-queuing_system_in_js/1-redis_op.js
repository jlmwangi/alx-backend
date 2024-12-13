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

(async () => {
  try {
    await client.connect();

    async function setNewSchool(schoolName, value) {
	    client.set(schoolName, value, print);
    }
    async function displaySchoolValue(schoolName) {
	    const value = await client.get(schoolName);
	    console.log(`${value}`);
    }
    displaySchoolValue('Holberton');
    setNewSchool("HolbertonSanFrancisco", "100");
    displaySchoolValue("HolbertonSanFrancisco");

  } catch (error) {
    console.log(`Redis client not connected to the server: ${error.message}`);
  }
})();

//function setNewSchool(schoolName, value) {
//  client.set(schoolName, value, print);
//}

//function displaySchoolValue(schoolName) {
//  client.get(schoolName, (err, val) => {
//    if (err) {
//      console.error(err);
//    } else {
//      console.log(val);
//    }
//  });
//}

//displaySchoolValue('Holberton');
//setNewSchool('HolbertonSanFrancisco', '100');
//displaySchoolValue('HolbertonSanFrancisco');
