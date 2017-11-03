/* eslint-env mocha */
var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var domUtils = sinon.stub();
var containerIds = require("../../lib/utils/dom/getContainerIds.js");

describe("Unit Tests", function() {
	describe("Given I have controlling elements", function() {
		it("should give me an array of ids", function() {

			//arrange
			domUtils.getControllingElementId = sinon.stub().returns("something");
			domUtils.getIdsOfControlledContainers =  sinon.stub().returns(["randomId"]);

			var parentElement = {
				"id" : "test"
			};

			//act
			var result = containerIds(parentElement, domUtils);

			//assert
			expect(result).to.deep.equal(["randomId"]);
		});
	});

	describe("Given I have no controlling elements", function() {
		it("should give me id of the parentMenuEl", function() {

			domUtils.getControllingElementId = sinon.stub().returns(null);
			domUtils.getIdsOfControlledContainers =  sinon.stub().returns(null);

			var parentElement = {
				"id" : "test"
			};

			var result = containerIds(parentElement, domUtils);

			expect(result).to.deep.equal(["test"]);
		});
	});

	describe("Given I have controlling element and no controlled containers", function() {
		it("should give me null", function() {

			domUtils.getControllingElementId = sinon.stub().returns("something");
			domUtils.getIdsOfControlledContainers =  sinon.stub().returns(null);

			var parentElement = {
				"id" : "test"
			};

			var result = containerIds(parentElement, domUtils);

			expect(result).to.deep.equal(null);
		});
	});

	describe("Given I have a controlled container I have no controlling element", function() {
		it("should return the parentElementId as array", function() {

			domUtils.getControllingElementId = sinon.stub().returns(null);
			domUtils.getIdsOfControlledContainers =  sinon.stub().returns("something");

			var parentElement = {
				"id" : "test"
			};

			var result = containerIds(parentElement, domUtils);

			expect(result).to.deep.equal(["test"]);
		});
	});
});
