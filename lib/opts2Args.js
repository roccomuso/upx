'use strict'

const mapArgs = {
  faster: '-1',
  better: '-9',
  best: '--best',

  decompress: '-d',
  list: '-l',

  force: '-f',

  brute: '--brute',
  ultraBrute: '--ultra-brute',

  overlayCopy: '--overlay=copy',
  overlayStrip: '--overlay=strip',
  overlaySkip: '--overlay=skip',

  '8086': '--8086',
  noReloc: '--no-reloc',

  '8bit': '--8-bit',
  '8mibRam': '--8mib-ram'
}

module.exports = function (rawOpts) {
  var args = ''
  Object.keys(rawOpts).forEach(function (k) {
    if (rawOpts[k] && mapArgs[k]) args += `${mapArgs[k]} `
  })
  return args
}
