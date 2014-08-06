var utils = require('./tophat.utils');
var tophatSearch = require('./tophat.search.html');

function generateSearchElement() {
    return utils.create( tophatSearch );
}

module.exports = generateSearchElement;
