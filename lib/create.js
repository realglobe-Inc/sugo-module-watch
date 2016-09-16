/**
 * Create a module instance
 * @function create
 * @returns {WatchModule}
 */
'use strict'

const WatchModule = require('./watch_module')

/** @lends create */
function create (...args) {
  return new WatchModule(...args)
}

module.exports = create
