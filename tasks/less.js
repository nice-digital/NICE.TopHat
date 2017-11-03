module.exports = function() {
	return {
		options: {
			compress: true,
			cleancss: true,
			ieCompat: true
		},

		dist: {
			files: {
				"temp/tophat.css": "lib/styles/tophat.less"
			}
		}
	};
};
