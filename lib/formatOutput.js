
module.exports = function (operation, stdout) {
  // parse stats from stdout
  // excluding credits empty rows.
  return getStats(operation, stdout)
}

function getStats (cmd, stdout) {
  var lines = stdout.match(/[^\r\n]+/g)
  var statLine = 0

  lines.forEach(function (l, i) {
    if (l.indexOf('---------') > -1) statLine = i
  })

  var data = lines[statLine + 1].trim().split(/\s+/)

  return {
    cmd: cmd,
    name: data[5],
    fileSize: {
      before: cmd === 'decompress' ? data[2] : data[0],
      after: cmd === 'decompress' ? data[0] : data[2]
    },
    ratio: data[3],
    format: data[4],
    affected: 1 // TODO: enable multiple file compression.
  }
}

/*
### DECOMPRESS OUTPUT SAMPLE:
credits...

        File size         Ratio      Format      Name
   --------------------   ------   -----------   -----------
   1859072 <-    364544   19.61%    win32/pe     upx.exe

Unpacked 1 file.

### COMPRESS OUTPUT SAMPE:

File size         Ratio      Format      Name
--------------------   ------   -----------   -----------
1859072 ->    420352   22.61%    win32/pe     upx.exe

Packed 1 file.

### LIST COMPRESSED OUTPUST SAMPLE:

File size         Ratio      Format      Name
--------------------   ------   -----------   -----------
1859072 ->    420352   22.61%    win32/pe     upx.exe

*/
