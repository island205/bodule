var deepMerge     = require('deepmerge')
var _             = require('underscore')
var uglifyParser  = require('uglify-js').parser

var DEFAULT_OPTIONS = {
  path: './index.js',
  package:{
    'name': 'bodule',
    'version': '0.1.0',
    'dependencies': {
    },
    'main': 'index.js'
  },
  'type':'amd'
}

function travelAst(ast, callback) {
  if (_.isArray(ast)) {
      ast.forEach(function (item) {
          callback(item)
          travelAst(item, callback)
      })
  }
}


exports.bodule = function (code, options) {
  var ast, deps, package, wrapCode, module
  options = deepMerge(_.clone(DEFAULT_OPTIONS), options)

  ast = uglifyParser.parse(code)
  deps = []
  package = options.package.name + '@' + options.package.version
  wrapCode = []
  travelAst(ast, function (item) {
    var dep
    if (_.isArray(item)) {
         // Match ast like
         // `["call",["name","require"],[["string","${dep}"]]]]`
         if (item[0] === 'call' && item[1] && item[1][1] === 'require') {
            dep = item[2][0][1]
            if (deps.indexOf(dep) === -1) {
                  deps.push(dep)
            } 
         }
     }
  })

  module = package + options.path
  function cmdize(code) {
    deps.forEach(function (dep) {
        var module
        var REQUIRE_REG = new RegExp('require\\([\'\"]' + dep + '[\'\"]\\)', 'g')
        // console.log(REQUIRE_REG)
        if(dep.indexOf('./') > -1) {
            module = package + '/' + dep
            code = code.replace(REQUIRE_REG, 'require(\'' + module + '\')')
        } else {
            code = code.replace(REQUIRE_REG, 'require(\'' + dep + '@' + options.package.dependencies[dep] + '\')')
        }
    })
    return code
  }
  if (options.type == 'amd') {
    wrapCode.push(
        'define(\'' + module + '\', [' + deps.map(function (dep) { return '\'' + dep + '@' + options.package.dependencies[dep]+ '\'' }).join(', ') + '], function (require, exports, module) {\n' 
    )
    wrapCode.push(code)
    wrapCode.push(
      '\n})'
    )
  } else {
    wrapCode.push(
        'define(function (require, exports, module) {\n' 
    )
    wrapCode.push(cmdize(code))
    wrapCode.push(
      '\n})'
    )
    
  }
  return wrapCode.join('')
}

