# NICE.TopHat

Distributable, branded tophat component for NICE Services and Web Applications

## Project structure

- The [JavaScript](lib) is written in modular ES5
- [browserify](http://browserify.org/) is used to bundle into a single file
- It uses [LESS](lib/styles) as the CSS pre-processor
- [cssify](https://www.npmjs.com/package/cssify) (a Browserify transform) is used to include the compiled CSS in the JS bundle
- Grunt is used as the task runner

## Installation

You will need [Node](https://nodejs.org/en/) v0.12+ installed, then on a command line run the following:

```
npm i
```

## Commands

| Task | Description |
| ---- | ----------- |
| `grunt` | Default grunt task that builds assets and watches for changes to recompile |
| `grunt build` | Builds the distributable scripts form the source files |
| `grunt webserver` | Starts a dev web server on the first available port starting from 8000 |
| `grunt test` or `npm test` | Runs jshint against the script and test files then runs the html screenshot tests (via Casper) to check for changes to the designs |

## Deployment

1) Update version parameter in package.json
1) Create a tag

Deployment to the CDN is currently done manually, so speak to ops. Once the tophat dist files have been created, these should then be copied into https://github.com/nhsevidence/NICE.Bootstrap/tree/master/src/scripts/nice. 
