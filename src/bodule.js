var uglifyParser    = require('uglify-js').parser
var _               = require('underscore')
var travelAst       = require('./util').travelAst
var cmdize          = require('./cmdize')

module.exports = function(path, code, _package) {
	var ast, deps = []
	ast = uglifyParser.parse(code)
	travelAst(ast, function(ast) {
		var dep
		if (_.isArray(ast)) {

			// Match ast like
			// `["call",["name","require"],[["string","${dep}"]]]]`

			if (ast[0] === 'call' && ast[1] && ast[1][1] === 'require') {
				dep = ast[2][0][1]
				if (deps.indexOf(dep) === - 1) {
					deps.push(dep)
				}
			}
		}
	})

	return cmdize(path, code, deps, _package)
}

