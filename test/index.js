var bodule = require('../').bodule

bodule('var a = require("a");',{
	path:'/b.js',
	package: {
		dependencies:{
			'a':'0.0.1',
			'xxxxx':'0.0.2'
		}								
	}
})

bodule('var a = require("a"); require("xxxxx")',{
	path:'/b.js',
	package: {
		dependencies:{
			'a':'0.0.1',
			'xxxxx':'0.0.2'
		}								
	}
})
