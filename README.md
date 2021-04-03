# soren-stdin

## Introduction

Soren-stdin is a library for interacting with stdin like [`jest watch`](https://jestjs.io/docs/cli#running-from-the-command-line). It purpose is to help with developing interactive CLI applications.

## Installation

```sh
$ npm install --save soren-stdin
```

## Usage

```js

const soren = require('soren-stdin');

const EXIT_KEY = 'q';
const ANALYZE_KEY = 'a';
const FILTER_KEY = 'm';
const ENTER_KEY = '\n';
const PAUSE_KEY = 'p';

const state = [];
const interactiveConfig = [
    {
        key: ANALYZE_KEY,
        description: 'Analyze build for performance improvements',
        onShowMore: {
            action: () => {},
        },
    },
    {
        key: PAUSE_KEY,
        description: 'Pause compilation at a given time',
        onShowMore: {
            action: () => {},
        },
    },
    {
        key: FILTER_KEY,
        description: 'Filter a module and get stats on why a module was included',
        onShowMore: {
            action: () => {},
        },
    },
    {
        key: ENTER_KEY,
        description: 'Run webpack',
        onShowMore: {
            action: () => {},
        },
    },
    {
        key: EXIT_KEY,
        description: 'Exit interactive mode',
        onShowMore: {
            action: () => {
                console.clear();
                process.exit();
            }
        },
    },
];

soren(interactiveConfig);

```