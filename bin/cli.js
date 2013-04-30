#!/usr/local/bin/node

var program = require('commander'),
    bodule = require('../').bodule,
    fs = require('fs'),
    watch = require('watch'),
    path = require('path')

program
  .option('-t, --type', 'special wrapper type, cmd or amd')
  .option('-o, --output [path]', 'path to put wrapped files')
  .option('-w, --watch', 'watch file change, auto bodule')
  .parse(process.argv)

var src = program.args[0] || '.',
    dest = program.output || '.bodule',
    type = program.type || 'amd'

// Comile file in `filePath` to `dest`

function wrapFile(filePath, type, dest) {
    var file, fileName
    fileName = path.basename(src)
    file = fs.readFileSync(filePath, 'utf8')
    file = bodule(file, {
        type: type
    })
    fs.writeFileSync(dest + '/' +  fileName, file)
    console.log(filePath + ' is wraped to ' + dest)
}

function wrapDir(dirPath, type, dest) {
    var files = fs.readdirSync(src)
    files.forEach(function (file) {
        wrapFile(src + file, type, dest)
    }) 
}

if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest)
}

if (program.watch) {
    if (fs.statSync(src).isDirectory()) {
        console.log(src + ' is watched!')
        watch.createMonitor(src, function (monitor) {
            monitor.on("created", function (f, stat) {
                wrapFile(f, type, dest)
            })
            monitor.on("changed", function (f, curr, prev) {
                wrapFile(f, type, dest)
            })
        })
    }
}


var files = []
if (src.indexOf('.js') > -1) {
    wrapFile(src, type, dest)
} else {
    wrapDir(src, type, dest)
} 
