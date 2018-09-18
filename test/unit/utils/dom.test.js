/* eslint-env mocha */
var chai = require("chai");
var expect = chai.expect;
var domUtils = require("../../../lib/utils/dom.js");

describe("dom.js", function() {
	describe("htmlEncode", function() {
		it("should html encode quotes", function() {

			//arrange
			var result = domUtils.htmlEncode("\"");

			//assert
			expect(result).to.equal("&quot;");
		});

		it("should html encode tags", function() {

			//arrange
			var result = domUtils.htmlEncode("<a href=\"test\"></a>");

			//assert
			expect(result).to.equal("&lt;a href=&quot;test&quot;&gt;&lt;/a&gt;");
		});
	});
});
