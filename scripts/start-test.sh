#!/bin/bash

export NODE_ENV=test
./node_modules/.bin/nyc ./node_modules/.bin/mocha -C ./test/index.js --full-trace --exit

