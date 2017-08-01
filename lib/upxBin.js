const exec = require('child_process').exec
const path = require('path')
const formatOutput = require('./formatOutput')

const BASE_PATH = path.join(__dirname, '../bin')

const arch = process.arch.match(/armv/) ? 'arm' : 'amd64'
const binPath = process.platform === 'win32' ? `upx.exe` : `upx-linux-${arch}`
// TODO: missing support mac OS. (try native upx and show watning: brew install upx)
const binAbsolute = path.join(BASE_PATH, binPath)

module.exports = function (args, cb) {
  var output = this.output ? '-o ' + this.output : ''
  var cmd = `${binAbsolute} ${this.file} ${args} ${output}`
  console.log('comando', cmd)
  exec(cmd, function (error, stdout, stderr) {
    if (error) {
      return cb(error)
    }
    cb(null, formatOutput(getOperation(args), stdout))
  })

}

function getOperation (args) {
  // detect operation from args
  var opList = ['decompress', 'list', 'compress']
  if (args.indexOf('-d') > -1) return 'decompress'
  if (args.indexOf('-l') > -1) return 'list'
  else return 'compress'
}
