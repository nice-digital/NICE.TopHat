module.exports = function() {
	return {
		options: {
			processors: [
				require("postcss-em-media-query")(),
				require("postcss-pxtorem")({replace: false, propList: ["*"]})
			]
		},
		dist: {
			src: "temp/tophat.css"
		}
	};
};
