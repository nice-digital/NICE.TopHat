# NICE.TopHat

Distributable, branded tophat component for NICE Services and Web Applications

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Project structure](#project-structure)
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
	- [Visual regression and functional tests](#visual-regression-and-functional-tests)
		- [Visual tests:](#visual-tests)
		- [Functional tests](#functional-tests)
		- [BrowserStack](#browserstack)
- [Updating ToC](#updating-toc)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Project structure

- The [JavaScript](lib) is written in modular ES5
- [browserify](http://browserify.org/) is used to bundle into a single file
- It uses [LESS](lib/styles) as the CSS pre-processor
- [cssify](https://www.npmjs.com/package/cssify) (a Browserify transform) is used to include the compiled CSS in the [JS bundle](dist)
- Grunt is used as the task runner, loading config in from the [tasks/options](tasks/options) folder

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
<script src="//cdn.nice.org.uk/V3/Scripts/nice/NICE.TopHat.dev.js"></script>
```

with:

```html
<script src="http://localhost:8000/tophat.dev.js"></script>
```

## Usage

The basics of tophat usage to add a reference to the TopHat script, ideally from a CDN, just before the closing body tag:

```html
<script src="//cdn.nice.org.uk/V3/Scripts/nice/NICE.TopHat.dev.js"></script>
```
But TopHat can be extended with extra markup and configured via data attributes.

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
<script src="//cdn.nice.org.uk/V3/Scripts/nice/NICE.TopHat.dev.js" data-environment="Live"></script>
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
To make TopHat stretch to the width of the window such as on [Pathways](http://pathways.nice.org.uk/) and [Evidence Search](https://www.evidence.nhs.uk/) just add `class="layout-fill"` to the `body` element. (This effectively sets `max-width: 100%` on `.tophat-inner`).

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

1. Update version parameter in package.json
1. Create a tag for that version

Deployment to the CDN is currently done manually, so speak to ops. Once the tophat dist files have been created, these should then be copied into https://github.com/nhsevidence/NICE.Bootstrap/tree/master/src/scripts/nice. 

## Testing

We have 4 types of automated 'tests' within TopHat:

- Linting
- Unit - fast and low level code testing on a per-module basis
- Visual regression - approved screenshot based visual testing
- Funtional - WebDriver-based (Selenium) browser-driven 'acceptance' tests.

### Linting

We use eslint via a shared [eslint config](.eslintrc). This lints all JavaScript files (source, task configs and test files).

Use the following command to run the linting:

```
npm run lint
```

### Unit tests 

Unit tests can be found in the [tests/unitTests](tests/unitTests) folder. To run them:

```
npm test
```

They use the following tools under the hood:

- [Mocha](https://mochajs.org/) as a test runner
- [Chai](http://chaijs.com/) as an assertion library
- [Sinon](http://sinonjs.org/) for spies, stubs and mocks

### Visual regression and functional tests

The visual regression tests are run inside a docker container. This is because this guarantees the images will be the same on each run (and avoids cross-platform rendering issues).

To run them you need docker installed and running on your machine then simply execute:

```
export SITE=website
export accountsUsername="XXX"
export accountsPassword="XXX"
./run.sh
```

NOTE: Replace XXX with variables from TeamCity.

If you are on a windows machine run the above command from a git bash shell. 

The test loops through all the various sites using TopHat, loads them into a browser and takes a screenshot of each of them.  It then compares them and fails the test accordingly.
As part of the run script it will run the functional tests as well.

#### Visual tests:
The tests cannot be run on a local machine as the reference images are the ones from inside the docker container.  The screenshots taken differs from your local machine to the ones taken inside the docker container.  If the reference screenshots get screwed up then the whole process can be started again by doing this:

NOTE: Replace XXX with variables from octodeploy

1. Delete the screenshots/reference folder
2. Run:
```
	export SITE=website
	export accountsUsername= XXX
	export accountsPassword= XXX
	./run.sh
```
3. Then copy the new reference screenshots taken from the screenshots_copy folder to the screenshots folder
4. Run ```./run.sh``` again
5. Finally commit the new images to git.

####  Functional tests 
These tests differ from the visual tests in the way that they don't take screenshots but still run browser driven tests.

To run locally without docker:

1.Open a bash terminal in root of project.

2.Ensure you have selenium-server-standalone-3.0.1.jar and chromedriver.exe in the repo, if not download them to the root of the project.

3.Run:
``` 
java -jar -Dwebdriver.gecko.driver=./chromedriver selenium-server-standalone-3.0.1.jar 
```

4. In another terminal run: 
```
	export SITE=localhost
	export accountsUsername= XXX
	export accountsPassword= XXX
	node_modules/webdriverio/bin/wdio
```

#### BrowserStack

We run functional tests cross-browser via BrowserStack, see [wdio.conf.browserstack.js](wdio.conf.browserstack.js). Before you run the tests, you'll need to set environment variables for:

- [BrowserStack Automate](https://www.browserstack.com/accounts/settings) username & access key
- NICE Accounts (Beta) login & password:

```sh
export browserStackKey="browserstack-access-key-here"
export browserStackUser="browserstack-username-here"
export accountsUsername="nice-accounts-email-here"
export accountsPassword="nice-accounts-password-here"
```

> Note: you can get these from the Octopus Deploy variables

Run these tests with:

```sh
npm run testUsingBrowserStack
```

You can see logging information in the command window, or navigate to https://www.browserstack.com/automate to see the BrowserStack session logs. Raise an Ops Request to get access to Browserstack if you don't already.

These run against [dev-tophat.nice.org.uk](http://dev-tophat.nice.org.uk/) by default. This means you'll need to check the right branch is deployed to dev in Octo before you run the tests. Override `BASE_URL` before running the tests to use a different URL:

```sh
export BASE_URL="http://test-tophat.nice.org.uk/"
```

## Updating ToC

Run the following command to update the table of contents (you'll need npm >= 5.2):

```sh
npx doctoc .
```
