/**
 * WatchModule class
 * @class WatchModule
 * @augments Module
 * @param {Object} config - Configuration
 */
'use strict'

const chokidar = require('chokidar')
const { Module } = require('sugo-module-base')
const { name, version, description } = require('../package.json')

const co = require('co')
const { hasBin } = require('sg-check')
const debug = require('debug')('sugo:module:demo-module')

/** @lends WatchModule */
class WatchModule extends Module {
  constructor (config = {}) {
    debug('Config: ', config)
    super(config)
    const s = this
    s._watcher = null
  }

  /**
   * Ping a message.
   * @param {string} pong
   * @returns {Promise.<string>} - Pong message
   */
  ping (pong = 'pong') {
    return co(function * pingAck () {
      return pong // Return result to a remote caller.
    })
  }

  /**
   * Assert actor system requirements.
   * @throws {Error} - System requirements failed error
   * @returns {Promise.<boolean>} - Asserted state
   */
  assert () {
    const bins = [ 'node' ] // Required commands
    return co(function * assertAck () {
      yield hasBin.assertAll(bins)
      return true
    })
  }

  /**
   * Start to watch
   */
  watch (fileOrDir, options) {
    const s = this
    return co(function * () {
      s._watcher = chokidar.watch(fileOrDir, options)
      let pipe = (event) => {
        s._watcher.on(event, (...data) => {
          debug(event, data)
          switch (event) {
            case 'all':
              s.emit(event, { event: data[0], path: data[1] })
              return
            default:
              s.emit(event, data[0])
              return
          }
        })
      }
      let events = [
        'all',
        'add',
        'change',
        'unlink',
        'addDir',
        'unlinkDir',
        'error',
        'ready'
      ]
      for (let event of events) {
        pipe(event)
      }
      return 'hoge'
    })
  }

  /**
   * Module specification
   * @see https://github.com/realglobe-Inc/sg-schemas/blob/master/lib/module_spec.json
   */
  get $spec () {
    return {
      name,
      version,
      desc: description,
      methods: {
        ping: {
          desc: 'Test the reachability of a module.',
          params: [
            { name: 'pong', type: 'string', desc: 'Pong message to return' }
          ],
          return: {
            type: 'string',
            desc: 'Pong message'
          }
        },

        assert: {
          desc: 'Test if the actor fulfills system requirements',
          params: [],
          throws: [ {
            type: 'Error',
            desc: 'System requirements failed'
          } ],
          return: {
            type: 'boolean',
            desc: 'System is OK'
          }
        },

        watch: {
          desc: 'Start watching file or directory',
          params: [
            {name: 'fileOrDir', type: 'string', desc: 'file or dir'},
            {name: 'options', type: 'object', desc: 'options'}
          ],
          return: {
            type: 'string',
            desc: ''
          }
        }
      },

      events: {
        'all': {desc: ''},
        'add': {desc: ''},
        'change': {desc: ''},
        'unlink': {desc: ''},
        'addDir': {desc: ''},
        'unlinkDir': {desc: ''},
        'error': {desc: ''},
        'ready': {desc: ''}
      }
    }
  }
}

module.exports = WatchModule
