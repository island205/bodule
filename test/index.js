var bodule = require('../')

var wrapCode = bodule('/b.js', 'var a = require("a");', {
	name: 'bodule',
	version: '0.1.0',
	dependencies: {
		'a': '0.0.1',
		'xxxxx': '0.0.2'
	}
})

console.log(wrapCode)

wrapCode = bodule('/b.js', 'var a = require("a"); require("xxxxx")', {
	name: 'bodule',
	version: '0.1.0',
	dependencies: {
		'a': '0.0.1',
		'xxxxx': '0.0.2'
	}
})

console.log(wrapCode)

