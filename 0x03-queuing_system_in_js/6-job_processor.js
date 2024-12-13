const kue = require('kue');
const queue = kue.createQueue();

function sendNotification(phoneNumber, message) {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

//a queprocess to listen on new jobs on push_notif_code
// where every job calls the sendNotif function with phone number and message
//  contained within the job data

queue.process('push_notification_code', (job, done) => {
    const { phoneNumber, message } = job.data;

    try {
	sendNotification(phoneNumber, message);
	done();
    } catch (error) {
	done(error);
    }
});
