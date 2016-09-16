#!/usr/bin/env node

/**
 * Example to call from caller
 * @see https://github.com/realglobe-Inc/sugo-caller
 */
'use strict'

const co = require('co')
const sugoCaller = require('sugo-caller')

co(function * () {
  // let url = 'http://my-sugo-cloud.example.com/callers'
  let url = 'http://localhost:3000/callers'
  let caller = sugoCaller(url, {})
  let actor = yield caller.connect('my-actor-01')

  // Access to the module
  let watcher = actor.get('watcher')

  // Watch 'tmp' directory
  yield watcher.watch('tmp', {})
  watcher.on('all', ({event, path}) => {
    console.log(event, path)
  })
}).catch((err) => console.error(err))
