module.exports = function() {
	return {
		temp: {
			expand: true,     // Enable dynamic expansion.
			cwd: "lib/",      // Src matches are relative to this path.
			src: ["**/*.js"], // Actual pattern(s) to match.
			dest: "temp/",   // Destination path prefix.
		}
	};
};
