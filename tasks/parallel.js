module.exports = function() {
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
