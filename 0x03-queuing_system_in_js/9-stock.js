const { createClient } = require('redis');
const express = require('express');
const app = express();
const port = 1245;


const client = createClient({
	socket: {
		host: '127.0.0.1',
		port: 6379,
	},
});

client.on('connect', () => {
	console.log('Redis client connected to the server');
});

client.on('error', () => {
	console.log('Redis client couldnt connect to the server');
});


(async () => {
	try {
		await client.connect();
	} catch (error) {
		console.error(error.message);
	}
})();

const listProducts = [
	{ itemId : 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
	{ itemId : 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
	{ itemId : 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
	{ itemId : 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];


app.get('/list_products', (req, res) => {
	res.json(listProducts);
})

app.get('/list_products/:itemId', async (req, res) => {
	const itemId = parseInt(req.params.itemId, 10);
	const item = getItemById(itemId);

	if (!item) {
		return res.json({ status: "Product not found" });
	}
	const stock = parseInt(await getCurrentReservedStockById(itemId));
	res.json({ ...item, currentQuantity: stock });
})

app.get('/reserve_product/:itemId', (req, res) => {
	const itemId = parseInt(req.params.itemId, 10);
	const item = getItemById(itemId);

	if (!item) {
		return res.json({ status: "Product not found" });
	}
	//check if theres atleast one stock available
	const availableStock = parseInt(item.initialAvailableQuantity);
	if (availableStock <= 1) {
		return res.json({status: "Not enough stock available", itemId: itemId});
	}
	try {
		reserveStockById(itemId, 1)
		return res.json({status: "Reservation confirmed", itemId: itemId});
	} catch (error) {
		throw error;
	}
})


function getItemById(id) {
	// return item from listproducts with same id
	for (const item of listProducts) {
		if (item.itemId === id) {
			return item;
		}
	}
	return null;
}

function reserveStockById(itemId, stock) {
	// sets in redis the stock for the key item.ITEM_ID
	client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
	try {
		const stock = await client.get(`item.${itemId}`);
		return stock;
	} catch (err) {
		throw err;
	}
}


app.listen(port, () => {
	console.log(`Server listening on ${port}`);
});
