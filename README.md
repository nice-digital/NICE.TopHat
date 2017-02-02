# NICE.TopHat

Distributable, branded tophat component for NICE Services and Web Applications

## Table of contents

- [Project structure](#project-structure)
- [Installation](#installation)
- [Commands](#commands)
- [Development](#development)
- [Usage](#usage)
  - [Markup](#markup)
  - [Configuration options](#configuration-options)
- [Deployment](#deployment)

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

## Development

Typically in development you would run `grunt` and `grunt webserver` alongside each other in 2 separate command windows.

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
| `data-search` | URL | The action URL for the search form E.g. `/search?q=` |
| `data-search-placeholder` | String | Placeholder value for the search input field. Default: 'Search...' |
| `data-typeaheadtype` | {remote,local} | The type of typehead request. *Remote* makes a GET request to `data-typeaheadsource`. *Local* uses a global variable. Requires a script reference to *//cdn.nice.org.uk/V3.1/Scripts/NICE.bootstrap.min.js*. |
| `data-typeaheadsource` | {URL,string} | URL: The source URL used for typeahead requests e.g. `/autocomplete?%query` or `/typeahead?q=%term`. string: The name of the global variable to use as the source. |
| `data-internal` | Boolean | If the current service is internal only. TODO: What does this affect? |
| `data-home` | URL | The URL used for the NICE Logo. Defaults to http://www.nice.org.uk if not set. |
| `data-wtrealm` | String | Passed to NICE Accounts as a querystring for authentication |

## Deployment

1. Update version parameter in package.json
1. Create a tag for that version

Deployment to the CDN is currently done manually, so speak to ops. Once the tophat dist files have been created, these should then be copied into https://github.com/nhsevidence/NICE.Bootstrap/tree/master/src/scripts/nice. 
