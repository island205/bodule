var bodule = require('../').bodule

var wrapCode = bodule('var a = require("a");',{
	path:'/b.js',
	package: {
		dependencies:{
			'a':'0.0.1',
			'xxxxx':'0.0.2'
		}								
	}
})

console.log(wrapCode)

wrapCode = bodule('var a = require("a"); require("xxxxx")',{
	path:'/b.js',
	package: {
		dependencies:{
			'a':'0.0.1',
			'xxxxx':'0.0.2'
		}								
	},
    type: 'cmd'
})

console.log(wrapCode)
