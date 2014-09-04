var utils = require('./tophat.utils');
var tophatSearch = require('./tophat.search.html');
var tophatSearchService = require('./tophat.search.service.html');

function generateSearchElement( globalElement, serviceElement, config ) {
    if (!config.search) return;

    utils.appendElement( utils.create( tophatSearchService ), utils.find( serviceElement, 'menu' )[0] );

    var view = tophatSearch.replace('{{method}}', 'post')
        .replace('{{action}}', config.search)
        .replace('{{typeaheadtype}}', config.typeaheadtype)
        .replace('{{typeaheadsource}}', config.typeaheadsource);

    var searchElement = utils.create( view );

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
