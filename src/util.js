var _ = require('underscore')

function travelAst(ast, callback) {
	if (_.isArray(ast)) {
		ast.forEach(function(ast) {
			callback(ast)
			travelAst(ast, callback)
		})
	}
}

exports.travelAst = travelAst
