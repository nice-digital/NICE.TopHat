module.exports = function() {
  return {
    test : {
      options: {
        reporter: 'spec',
        quiet: false, // Optionally suppress output to standard out (defaults to false)
        clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
        noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
      },
      src: ['test/unitTests/**/*.js']
    }
  }
}
