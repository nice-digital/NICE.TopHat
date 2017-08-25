module.exports = function( config ) {
	return {
		assets: {
			options: {
				grunt: true,
				stream: true
			},
			tasks: ["default", "webserver"]
		}
	};
};
