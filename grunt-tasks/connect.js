module.exports = function() {
	return {
		dev: {
			options: {
				useAvailablePort: true,
				keepalive: true,
				base: [ "./dist", "./site" ],
				open: "/visual.html"
			}
		}
	};
};
