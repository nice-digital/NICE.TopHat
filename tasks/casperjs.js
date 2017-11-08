module.exports = function() {
	return {
		options: {
			async: {
				parallel: true
			}
		},
		desktop: [ "./test/**/*.visual.js" ]
	};
};
