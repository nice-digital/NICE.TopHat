module.exports = function() {
	return {
		dist: {
			options: {
				mangle: {
					screw_ie8: false
				},
				preserveComments: /^!/,
				sourceMap: true,
				sourceMapName: "dist/tophat.map",
				compress: {
					sequences: true,
					dead_code: true,
					conditionals: true,
					booleans: true,
					unused: true,
					if_return: true,
					join_vars: true,
					drop_console: true,
					screw_ie8: false
				}
			},
			files: {
				"dist/tophat.min.js": "dist/tophat.dev.js"
			}
		}
	};
};
