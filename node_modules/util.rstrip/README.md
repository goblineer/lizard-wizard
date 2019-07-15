# util.rstrip

> Removes newline characters from the right of a string

[![build](https://circleci.com/gh/jmquigley/util.rstrip/tree/master.svg?style=shield)](https://circleci.com/gh/jmquigley/util.rstrip/tree/master)
[![analysis](https://img.shields.io/badge/analysis-tslint-9cf.svg)](https://palantir.github.io/tslint/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![testing](https://img.shields.io/badge/testing-jest-blue.svg)](https://facebook.github.io/jest/)
[![NPM](https://img.shields.io/npm/v/util.rstrip.svg)](https://www.npmjs.com/package/util.rstrip)
[![coverage](https://coveralls.io/repos/github/jmquigley/util.rstrip/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/util.rstrip?branch=master)


Removes the `\n`, `\r`, or `\r\n` from the end of a string or Buffer and returns the new string.


## Installation

This module uses [yarn](https://yarnpkg.com/en/) to manage dependencies and run scripts for development.

To install as a development dependency:
```
$ yarn add --dev util.rstrip
```

To build the app and run all tests:
```
$ yarn run all
```

## Example Usage

#### From String
```javascript
const rstrip = require('util.rstrip');
let s = rstrip('This is a test\r\n');

// returns the string "This is a test" without newlines
```

#### From Buffer
```javascript
const rstrip = require('util.rstrip');
let buf = new Buffer('This is a test\r\n');
let s = rstrip(buf);

// returns the string "This is a test" without newlines
```
