const chai = require('chai');
const expect = chai.expect;

const sinon = require('sinon');
const createPushNotificationsJobs = require('./8-job.js');

const kue = require('kue');
const queue = kue.createQueue();


describe('test suite for create pushNotificationsJobs', function () {
	before(function () {
		queue.testMode.enter();
	});
	afterEach(function () {
		queue.testMode.clear();
	});
	after(function() {
		queue.testMode.exit();
	});

	it('should throw an error if jobs is not an array', function() {
		expect(() => createPushNotificationsJobs('not array', queue)).to.throw('Jobs is not an array');
	});

	it('should create jobs when valid entries are entered', function() {
		const jobs = [
			{ phoneNumber: '14525675', message: 'Test message' },
			{ phoneNumber: '9876543', message: 'Test 2' },
		];
		//const queue = kue.createQueue();

		createPushNotificationsJobs(jobs, queue);

		expect(queue.testMode.jobs.length).to.equal(jobs.length);
		expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);
		expect(queue.testMode.jobs[1].data).to.deep.equal(jobs[1]);
	});

	it('should set event handlers for job cycle', function(done) {
		const jobs = [{ phoneNumber: '14525675', message: 'Test message' }];
		const job = queue.create('push_notification', jobs[0]);

		const completeSpy = sinon.spy();
		const failedSpy = sinon.spy();
		const progressSpy = sinon.spy();

		job.on('complete', completeSpy);
		job.on('failed', failedSpy);
		job.on('progress', progressSpy);

		//simulate job events
		job.emit('complete');
		job.emit('failed', new Error('Failed'));
		job.emit('progress', 50);

		expect(completeSpy.calledOnce).to.be.true;
		expect(failedSpy.calledOnce).to.be.true;

		done();
	});
});
