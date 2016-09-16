#!/usr/bin/env node

/**
 * Example usage to register module on actor
 * @see https://github.com/realglobe-Inc/sugo-actor
 */
'use strict'

// const sugoModuleWatch = require('sugo-module-watch')
const sugoModuleWatch = require('../lib')
const sugoActor = require('sugo-actor')
const co = require('co')

// let url = 'http://my-sugo-cloud.example.com/actors'
let url = 'http://localhost:3000/actors'

co(function * () {
  let actor = sugoActor(url, {
    key: 'my-actor-01',
    modules: {
      // Register the module
      watcher: sugoModuleWatch({})
    }
  })
  yield actor.connect()
}).catch((err) => console.error(err))
