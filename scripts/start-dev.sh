#!/bin/bash

export NODE_ENV=development
nodemon --exec babel-node bin/www
