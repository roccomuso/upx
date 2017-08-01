'use strict'
const fs = require('fs')
const debug = require('debug')('upx')
const upxBin = require('./upxBin')
const opts2Args = require('./opts2Args')

class Upx {

  constructor (file, opts) {
    fileExists(file)
    this.file = file
    this.opts = opts
  }

  output (outPath) {
    this.output = outPath
    return this
  }

  start () {
    debug('start called')
    var self = this
    return new Promise(function (resolve, reject) {
      upxBin.call(self, opts2Args(self.opts), function (err, stats) {
        if (err) return reject(err)
        resolve(stats)
      })
    })
  }

}

module.exports = function (opts) {
  return function(file) {
    return new Upx(file, opts)
  }
}

function fileExists (file) {
  try {
    fs.statSync(file)
  } catch (e) {
    debug('file not found', file)
    throw Error('Make sure the file exists:', file)
  }
}
