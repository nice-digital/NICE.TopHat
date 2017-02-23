module.exports = function( config ) {
  return {
	options: {
      processors: [
        require("postcss-em-media-query")()
      ]
	},
	dist: {
      src: "temp/tophat.css"      
	}
  };
};