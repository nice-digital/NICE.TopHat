var utils = require('./tophat.utils');
var tophatSearch = require('./tophat.search.html');

function generateSearchElement( globalElement, config ) {
    if (config.search === 'false') {
        return;
    }

    var searchElement = utils.create( tophatSearch );

    addSearchToGlobal( globalElement, searchElement );

    return searchElement;
}

function addSearchToGlobal( el, searchForm ) {
    var menu = utils.find( el, 'menu' )[0];

    if (menu) {
        return utils.insertBeforeElement( searchForm, menu );
    }

  utils.appendElement( searchForm, el.firstChild );
}

module.exports = generateSearchElement;
