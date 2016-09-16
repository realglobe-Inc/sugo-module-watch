/**
 * SUGOS module of watching files
 * @module sugo-module-watch
 * @version 1.0.0
 */

'use strict'

const create = require('./create')
const WatchModule = require('./watch_module')

let lib = create.bind(this)

Object.assign(lib, WatchModule, {
  create,
  WatchModule
})

module.exports = lib
