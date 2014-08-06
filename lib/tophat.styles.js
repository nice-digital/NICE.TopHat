var fs = require('fs');

module.exports = function(api) {
    api.importCSS( fs.readFileSync('temp/tophat.css', { encoding: 'utf8' }) );
};
