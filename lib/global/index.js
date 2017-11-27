var utils = require("../utils/dom");
var tophatGlobal = require("../templates/global/menu.html");
var tophatEnd = require("../templates/global/end.html");

function generateGlobalElement( tophatElement, config ) {
	var el = utils.find( tophatElement, "nice-global" )[0];

	if (!el) {
		el = utils.create( tophatGlobal );
	}

	if(!config.skipLinkId)
		utils.appendElement(utils.create(tophatEnd), el);

	return el;
}

module.exports = generateGlobalElement;
