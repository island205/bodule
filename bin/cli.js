#!/usr/local/bin/node

var program = require('commander'),
    bodule = require('../').bodule,
    fs = require('fs'),
    path = require('path')

program
  .option('-t, --type', 'special wrapper type, cmd or amd')
  .option('-o, --output [path]', 'path to put wrapped files')
  .option('-w, --watch', 'watch file change, auto bodule')
  .parse(process.argv)

var src = program.args[0] || '.',
    dest = program.output || '.bodule',
    type = program.type || 'amd'

if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest)
}

var file, fileName, files
if (src.indexOf('.js') > -1) {
    fileName = path.basename(src)
    file = fs.readFileSync(src, 'utf8')
    file = bodule(file, {
        type: type
    })
    fs.writeFileSync(dest + '/' +  fileName, file)
} else {
    files = fs.readdirSync(src)
    files.forEach(function (file) {
        fileName = path.basename(file)
        file = fs.readFileSync(src + file, 'utf8')
        file = bodule(file, {
            type: type
        })
        fs.writeFileSync(dest + '/' +  fileName, file)
            
    }) 
} 
