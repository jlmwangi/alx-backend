const blackListed = [4153518780, 4153518781]

const kue = require('kue');
const queue = kue.createQueue();

function sendNotification(phoneNumber, message, job, done) {
	// track job progress
	job.progress(0, 100);
	// check if blacklisted
	if (blackListed.includes(phoneNumber)) {
		return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
	}

	//track 50% job progress
	job.progress(50, 100);
        //log to console and complee the job
	console.log(`sending notification to ${phoneNumber}, with message: ${message}`);
	done();
}
 // process jobs in queue
queue.process('push_notification_code_2', 2, (job, done) => {
	const { phoneNumber, message } = job.data;
	sendNotification(phoneNumber, message, job, done);
});
