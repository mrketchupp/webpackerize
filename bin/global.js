#!/usr/bin/env node
const { webpackerize } = require('../src/index.js');
const { addScripts } = require('../src/copyConfig.js');

webpackerize();
addScripts();
