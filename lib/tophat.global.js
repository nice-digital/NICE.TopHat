var utils = require('./tophat.utils');
var tophatGlobal = require('./tophat.global.html');

function generateGlobalElement( tophatElement ) {
    var el = utils.find( tophatElement, 'nice-global' )[0];

    if (!el) {
        el = utils.create( tophatGlobal );
    }

    return el;
}

module.exports = generateGlobalElement;
