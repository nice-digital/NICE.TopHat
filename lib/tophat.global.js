var utils = require('./tophat.utils');
var tophatGlobal = require('./tophat.global.html');

function generateGlobalElement( tophatElement ) {
    return utils.create( tophatGlobal );
}

module.exports = generateGlobalElement;
