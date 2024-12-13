const chai = require("chai");
const expect = chai.expect;

const sinon = require("sinon");
const indexPage = require("../../controllers/app.controller.js");

const user = {
	addUser: (name) => {
		this.name = name;
	}
}

describe("getIndexPage", function () {
	it("should return index page", function () {
		let req = {}
		let res = {
			send: sinon.spy()
		}
		indexPage.getIndexPage(req, res);
		console.log(res.send);

		expect(res.send.calledOnce).to.be.true;
		expect(res.send.firstCall.args[0]).to.equal("Hey");
	});
});

describe("addUser", function() {
	it("should add a user", function() {
		sinon.spy(user, "addUser");
		user.addUser('jamie');
		user.addUser('sby');

		console.log(user.addUser);
		expect(user.addUser.calledOnce).to.be.false;
		expect(user.addUser.firstCall.args[0]).to.be.equal("jamie");
	});
});
