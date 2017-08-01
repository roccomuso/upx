const debug = require('debug')('upx')
const path = require('path')
const exec = require('child_process').exec
const formatOutput = require('./formatOutput')

const BASE_PATH = path.join(__dirname, '../bin')

const arch = process.arch.match(/armv/) ? 'arm' : 'amd64'
const os = process.platform
const binPath = os === 'win32' ? `upx.exe` : `upx-linux-${arch}`
// macOs fallback on native installation:
const binAbsolute = os === 'darwin' ? 'upx' : path.join(BASE_PATH, binPath)

module.exports = function (args, cb) {
  var output = this.output ? '-o ' + this.output : ''
  var cmd = `${binAbsolute} ${this.file} ${args} ${output}`
  debug('given cmd:', cmd)
  exec(cmd, function (error, stdout, stderr) {
    if (error) {
      if (os === 'darwin') error = 'make sure to install upx native dependency with: brew install upx'
      return cb(error)
    }
    cb(null, formatOutput(getOperation(args), stdout))
  })
}

function getOperation (args) {
  // detect operation from args
  if (args.indexOf('-d') > -1) return 'decompress'
  if (args.indexOf('-l') > -1) return 'list'
  else return 'compress'
}
