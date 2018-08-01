# NICE.TopHat

Distributable, branded tophat component for NICE Services and Web Applications

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [NICE.TopHat](#nicetophat)
	- [Table of contents](#table-of-contents)
	- [Project structure](#project-structure)
		- [Directory structure](#directory-structure)
	- [Installation](#installation)
	- [Commands](#commands)
	- [Development](#development)
	- [Usage](#usage)
		- [Markup](#markup)
		- [Configuration options](#configuration-options)
		- [Full width](#full-width)
		- [Typeahead](#typeahead)
			- [Typeahead tracking](#typeahead-tracking)
	- [Tracking](#tracking)
	- [Deployment](#deployment)
	- [Testing](#testing)
		- [Linting](#linting)
		- [Unit tests](#unit-tests)
			- [Coverage](#coverage)
			- [TeamCity](#teamcity)
		- [Functional tests](#functional-tests)
		- [Visual regression tests](#visual-regression-tests)
			- [Replacing reference images](#replacing-reference-images)
		- [BrowserStack](#browserstack)
	- [Updating ToC](#updating-toc)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Project structure

- The [JavaScript](lib) is written in modular ES5
- [browserify](http://browserify.org/) is used to bundle into a single file
- It uses [LESS](lib/styles) as the CSS pre-processor
- [cssify](https://www.npmjs.com/package/cssify) (a Browserify transform) is used to include the compiled CSS in the [JS bundle](dist)
- Grunt is used as the task runner, loading config in from the [grunt-tasks](grunt-tasks) folder

### Directory structure

| Folder        	| Usage           |
| ------------- 	| ------------- |
| .nyc_output		| Temp folder created by instanbul when running unit test coverage |
| browser			| ? |
| dist				| Bundled JS files (containing CSS and templates) and sourcemaps for deployment |
| docker-output		| Files (screenshots/errors/logs) copied out from Docker when running tests |
| errorShots		| Error screenshots generated from wdio when running functional tests locally (not in Docker) |
| grunt-tasks		| Grunt task configs |
| lib				| Source files (JavaScript, LESS and templates) |
| screenshots		| Reference screenshots for visual regression |
| site				| HTML files for the static dev site |
| test				| Unit test, functional specs, visual regression tests and html files for test site |

## Installation

You will need [Node](https://nodejs.org/en/) v0.12+ installed, then on a command line run the following:

```
npm i
```

## Commands

| Task | Description |
| ---- | ----------- |
| `npm start` | Default task that builds assets, watches for changes to recompile and serves content on locahost:8000 |
| `npm run build` | Builds the distributable scripts form the source files |
| `npm run build -- --buildNumber=X.X.X` | Used for overriding the version set in the banner of the JS file (Useful in TeamCity as our TC build numbers aren't valid npm versions) |
| `npm run lint` | Runs eslint against JavaScript source files |
| `npm run lint:teamcity` | Runs eslint against JavaScript source files and reports to teamcity |
| `npm test` | Lints script and runs low level unit tests via Mocha |
| `npm run test:unit` | Runs low level unit tests via Mocha |
| `npm run test:unit:teamcity` | Runs low level unit tests via Mocha with reporting for TeamCity |
| `npm run test:functional` | Runs webdriverio functional tests |
| `npm run test:functional:keyboardNav` | Runs webdriverio keyboard navigation functional tests |
| `npm run test:visual` | Runs webdriverio visual regressions tests |
| `npm run test:browserstack` | Runs webdriverio functional tests against browserstack |

> Note: there are other lower level grunt commands (see Gruntfile.js) but we recommend using the npm scripts where possible.

## Development

Typically in development you would run `npm start` which runs `grunt` and `grunt webserver` alongside each other.

To test a local instance of TopHat in-context against other services, temporarily swap the TopHat reference for the local one, e.g. swap:

```html
<script src="//cdn.nice.org.uk/tophat/tophat.min.js"></script>
```

with:

```html
<script src="http://localhost:8000/tophat.dev.js"></script>
```

Use the alpha CDN to test on test/alpha environments e.g. *//alpha-cdn.nice.org.uk/tophat/tophat.min.js*.

## Usage

The basics of TopHat usage is to add a reference to the TopHat script from the NICE CDN, just before the closing body tag:

```html
<script src="//cdn.nice.org.uk/tophat/tophat.min.js"></script>
```

Note: you also use a dev version at *//cdn.nice.org.uk/tophat/tophat.dev.js* and a sourcemap is provided at *//cdn.nice.org.uk/tophat/tophat.map*.

Note: you can also reference a specific version of TopHat in case of breaking changes e.g. *//cdn.nice.org.uk/tophat/VERSION/tophat.min.js*

TopHat can be extended with [extra markup](#markup) and [configured via data attributes](#configuration-options).

### Markup

TopHat will render into `.nice-tophat` if it exists or will create a new containing div (`.nice-tophat`) if it doesn't. It will always prepend the result to the body element.

If you need extra markup for header elements such as search, menus, logos etc, you can add these into the `.nice-tophat` div:

```html
<div class="nice-tophat">
		<div class="nice-global" id="nice-global">
				<div class="tophat-inner">
				
						<!-- Optional. Partner (service) logo will be styled by TopHat -->
						<a href="/" class="partner-logo">
							<img src="/logo.png">
						</a>
						
						<!-- Optional. Partner (service) name will be styled by TopHat -->
						<span class="partner-brand">Service name here</span>
						
						<!-- The search box (if `data-search` is specified) will be rendered here, just before .menu -->
						
						<!-- This nav will be styled by TopHat -->
						<ul class="menu">
								<li><a href="#">Item 1</a></li>
								<li><a href="#">Item 2</a></li>
								<li><a href="#">Item 3</a></li>
						</ul>
				</div>
		</div>
</div>
```

### Configuration options

TopHat can be configured with a set of `data-` attributes on the script tag, e.g.:

```html
<script src="//cdn.nice.org.uk/tophat/tophat.min.js" data-environment="Live"></script>
```

These are parsed out in [config.js](lib/config.js).

The attributes are as follows and are all optional:

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `data-service` | {pathways,guidance,standards} | The key for the active top-level service (if any) |
| `data-evidence` | {search,bnf,bnfc,cks,journals} | The key for the active Evidence service (if any). This automatically highlights 'Evidence' in the Top Level menu if set. |
| `data-environment` | {beta,live} | The environment of the current service |
| `data-timestamp` | ? | Not used? |
| `data-search` | URL | The action URL for the search form E.g. `/search?q=%term`. The token `%term` will be replaced with the search query. |
| `data-search-placeholder` | String | Placeholder value for the search input field. Default: 'Search...' |
| `data-typeaheadtype` | {remote,local} | The type of typehead request. *Remote* makes a GET request to `data-typeaheadsource`. *Local* uses a global variable. Requires a script reference to *//cdn.nice.org.uk/V3.1/Scripts/NICE.bootstrap.min.js*. |
| `data-typeaheadsource` | {URL,string} | URL: The source URL used for typeahead requests e.g. `/autocomplete?%query` or `/typeahead?q=%term`. string: The name of the global variable to use as the source. |
| `data-internal` | Boolean | If the current service is internal only. Internal services and are displayed slightly differently so as to be less intrusive visually. A placeholder can be included so that the bottom tier of the tophat is displayed with local service navigation. The `data-home` attribute can also be used in conjunction with this so that the logo directs users to the root of the current service rather than the global service root. |
| `data-home` | URL | The URL used for the NICE Logo. Defaults to http://www.nice.org.uk if not set. |
| `data-wtrealm` | String | Passed to NICE Accounts as a querystring for authentication |
| `data-cookie` | Boolean | Default: `false`. Set to true to enable a cookie message. This sets a cookie of `seen_cookie_message=yes` on the domain *.nice.org.uk*, meaning a user will only see a cookie message once across the whole of NICE. |
| `data-cookie-message` | String | Default: `NICE uses cookies to make the site better.`. The text to show in the cookie message. |
| `data-cookie-url` | URL | Default: `https://www.nice.org.uk/cookies`. The URL for the 'learn more' link in the cookie message (if enabled). |
| `data-skip-link-id` | String | Optional. The ID for the element containing the main content for the 'skip to main content' link. Default: 'tophat-end' |

### Full width
To make TopHat stretch to the width of the window such as on [Pathways](http://pathways.nice.org.uk/) and [Evidence Search](https://www.evidence.nhs.uk/) add `class="layout-fill"` to the `body` element. (This effectively sets `max-width: 100%` on `.tophat-inner`).

### Typeahead

The search bar rendered by TopHat renders a `[data-provide="typeahead"]` attribute on the input. This gets picked up by [NICE.Typeahead.js L226](https://github.com/nhsevidence/NICE.Bootstrap/blob/master/src/scripts/nice/NICE.Typeahead.js#L226). Which is why, for Typeahead to work either of the following is required:

- Easiest solution: //cdn.nice.org.uk/V3.1/Scripts/NICE.bootstrap.min.js - this includes NICE.Typeahead.js bundled in.
- //cdn.nice.org.uk/V3.1/Scripts/nice/NICE.Typeahead.js and //cdn.nice.org.uk/V3.1/Scripts/typeahead/typeahead.bundle.js

#### Typeahead tracking

Typeahead is setup to track when an term is selected, see [NICE.Typeahead.js L20-L38](https://github.com/nhsevidence/NICE.Bootstrap/blob/master/src/scripts/nice/NICE.Typeahead.js#L20-L38). This uses [NICE.EventTracking.js - $.fn.trackevent](https://github.com/nhsevidence/NICE.Bootstrap/blob/master/src/scripts/nice/NICE.EventTracking.js) under the hood. So to enable Typehead tracking with TopHat, you must also include a script reference to //cdn.nice.org.uk/V3.1/Scripts/nice/NICE.EventTracking.js. This sends a data layer variable to GTM that looks like the following:

```js
{
	event: 'GAevent',
	eventCategory: 'Typeahead',
	eventAction: 'TERM_TITLE',
	eventLabel: 'TERM_URL'
}
```

## Tracking

TopHat integrates with GTM by default. If a `dataLayer` is available on the page then TopHat pushes `dataLayer` objects for various actions. This means 2 things:

1) makes it easy to create a single trigger and tag for each service within a GTM container
2) we can track new features within TopHat without having to make a change in each GTM container for each service.

TopHat uses an `event` property of "TopHat" in the `dataLayer` object. It then passes an `eventCategory` of "TopHat" and values for `eventAction`, `eventLabel` and `eventValue`. For example:

```json
{
	"event": "TopHat",
	"eventCategory": "TopHat",
	"eventAction": "Tophat click",
	"eventLabel": "NICE Pathways"
}
```

> Note: TopHat takes care of an `eventCallback` for navigation links under the hood to ensure GTM tags have been fired before the page navigates away.

## Deployment

The TeamCity build uses the [package.json](package.json) version number as the basis for the build number and adds a counter and branch name. 

Deployment is automated via Octopus Deploy. It pushes the distribution files to an Amazon S3 bucket and invalidates the CloudFront cache. See the [usage](#usage) section for deployed URLs.

## Testing

We have 4 types of automated 'tests' within TopHat:

- [Linting](#linting)
- [Unit tests](#unit-tests) - fast and low level code testing on a per-module basis
- [Functional tests](#functional-tests) - WebDriver-based (Selenium) browser-driven 'acceptance' tests
- [Visual regression tests](#visual-regression0tests) - approved screenshot based visual testing.

### Linting

We use eslint via a shared [eslint config](.eslintrc) that uses [@nice-digital/eslint-config](https://www.npmjs.com/package/@nice-digital/eslint-config). This lints all JavaScript files (source, task configs and test files).

Use the following command to run the linting:

```sh
npm run lint
```

Run the following command on a TeamCity build server to report linting errors as failed tests:

```sh
npm run lint:teamcity
```

### Unit tests 

Unit tests can be found in the [tests/unit](tests/unit) folder. After running `npm i` on the command line to install dependencies, then run:

```sh
npm run test:unit
```

These unit tests use the following tools under the hood:

- [Mocha](https://mochajs.org/) as a test runner
- [Chai](http://chaijs.com/) as an assertion library
- [Sinon](http://sinonjs.org/) for spies, stubs and mocks
- [Istanbul](https://istanbul.js.org/) for coverage
- [jsdom](https://github.com/jsdom/jsdom) for an in-memory DOM

#### Coverage

To get coverage for our unit tests locally, run:

```sh
npm run test:unit:coverage
```

This will report coverage statistics on the console and will also generate a detailed HTML report in the coverage folder.

#### TeamCity

Run the following command a TeamCity build agent to get properly formatted test reports:

```sh
npm run test:unit:teamcity
```

And to get test reports and coverage on TeamCity, run:

```sh
npm run test:unit:teamcity:coverage
```

The *coverage* folder can then be used as an [artifact path](https://confluence.jetbrains.com/display/TCD10/Configuring+General+Settings#ConfiguringGeneralSettings-ArtifactPaths) and the path *coverage/index.html* used within a [report tab](https://confluence.jetbrains.com/display/TCD18/Including+Third-Party+Reports+in+the+Build+Results).

### Functional tests 

These are automated, browser-driven functional tests that execute in a real browser (or multiple browsers), via [WebdriverIO](http://webdriver.io/). They can be run locally, for development, or in Docker on a TeamCity build agent.

To run the functional tests locally, do the following:

1. Install dependencies by running `npm i` on a command line if you haven't already
2. Run `npm start` to run the local development server on http://localhost:8000
3. Open another terminal and run `export accountsUsername=XXX` and `export accountsPassword=YYY` with a valid Beta NICE Accounts username and password. Using your own Accounts login is fine or you can use a 'service account' like we use in TeamCity - see the parameters section. 
4. Run `npm run test:functional` in the second terminal
5. This runs the functional tests in Chrome (assumes you have it installed) and reports test runs on the console.

### Visual regression tests

Visual regression tests take screenshots of a webpage or webapp in a certain state and compares the image to an approved screenshot. This is useful for avoiding bugs liks accidental unwanted CSS cascades etc. If there is a difference between the taken and reference images then the test fails and a diff image is generated (with pink highlights). This diff image can be used to debug the reason the test has failed. If the app has legitimately changed then the taken image can be used to replace the old reference screenshot and the test will then pass.

The visual regression tests are run inside a Docker container. This guarantees the images will be the same on each run and avoids cross-platform rendering issues. You can run them locally but they **probably** won't match the reference images so it's recommended to use Docker.

To run them you need [Docker installed](https://www.docker.com/community-edition#/download) and running on your machine. If you're using [Docker for Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows), make sure you're using [Linux Containers](https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers) and not Windows Containers.

Run the following in a shell, for example GitBash on Windows (the accounts username and password are so we can verify what the app looks like when logged in):

```sh
export accountsUsername="XXX"
export accountsPassword="YYY"
./run.sh
```

NOTE: Replace XXX and YYY with a real Beta NICE Accounts user name and password. You can safely use your own as these are environment variables and won't displayed anywhere.

The test does the following:

1. loops through all the various sites that use TopHat
2. loads them into a browser and takes a screenshot of each of them
3. It then compares them and fails the test accordingly.

As part of the run script it will run the functional tests as well, inside the Docker container.

#### Replacing reference images

If the app changes (e.g. text change or CSS) and the visual regressions tests fail then you'll need to update the reference images. To do this:

1. run the tests in Docker as above
2. copy the new images from *docker-output/screenshots/taken* to *screenshots/reference*
3. commit the new images to git.

### BrowserStack

We run functional tests cross-browser (currently only in Edge as its free) via BrowserStack, see [wdio.browserstack.conf.js](wdio.browserstack.conf.js). Before you run the tests, you'll need to set environment variables for:

- [BrowserStack Automate](https://www.browserstack.com/accounts/settings) username & access key
- NICE Accounts (Beta) login & password:

```sh
export browserStackKey="browserstack-access-key-here"
export browserStackUser="browserstack-username-here"
export accountsUsername="nice-accounts-email-here"
export accountsPassword="nice-accounts-password-here"
```

> Note: you can get these from the Octopus Deploy / TeamCity  variables

Run these tests by running the follow on the command line:

```sh
npm run test:browserstack
```

You can see logging information in the command window, or navigate to https://automate.browserstack.com/ to see the BrowserStack session logs. Raise an Ops Request to get access to our Browserstack organisation if you don't already.

To run them against the local dev TopHat site, override the `BASE_URL` environment variable: `export BASE_URL="http://localhost:8000/"`. Or alternatively point your tests at the test environment: `export BASE_URL="http://test-tophat.nice.org.uk/"`.

If you don't override `BASE_URL` then they tests will run against [dev-tophat.nice.org.uk](http://dev-tophat.nice.org.uk/) by default. This means you'll need to check the right branch is deployed to dev in Octo before you run the tests.

## Updating ToC

Run the following command to update the table of contents (you'll need npm >= 5.2):

```sh
npx doctoc .
```
