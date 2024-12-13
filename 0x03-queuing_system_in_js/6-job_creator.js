const kue = require('kue');
const queue = kue.createQueue();

const object =  {
	phoneNumber: 'string',
	message: 'string',
}

try {
    const job = queue.create('push_notification_code', object).save(err => {
	if (err) {
	    console.error(err);
	} else {
	    console.log(`Notification job created: ${job.id}`);
	}
    });

    job.on('complete', function () {
	console.log('Notification job completed');

    }).on('failed', function () {
        console.log('Notification job failed');
    });
} catch (err) {
    console.log(err);
}
