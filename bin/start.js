#!/usr/bin/env node
'use strict';

require('babel-core/register')({
  presets: ['babel-preset-es2015']
});

require('../');
