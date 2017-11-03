module.exports = function() {
	return {
		dev: {
			options: {
				useAvailablePort: true,
				keepalive: true,
				base: [ "./dist", "./test" ],
				open: "/visual.html"
			}
		}
	};
};
