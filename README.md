Bodule ['bɑdʒul]
======

Bodule is a solution for port Node.js packages to brower. This is the core repo: **CMDZIE A NODE MODULE**.

## Usage

```javascript
var bodule = require('bodule')

var code = "var _ = require('underscore')"

code = bodule('/foo.js', code, {
    name: 'yourPackageName',
    version : '0.1.0',
    dependencies: {
        'underscore': '1.4.4'
    }
})

console.log(code)

/*
define('yourPackageName@0.1.0/foo.js', ['underscore@1.4.4'], function (require, exports, module) {
    var _ = require('underscore')
})
*/
```

## API

**`bodule(path, code, pkg, [options])`**

### path

The module path relative to the packege.

### code

The module code, Maybe read from a file.

### pkg

The package.json. The keys must have :

1. name
2. version
3. dependencies

### options

optional.

```javascript
{
	useStrict: true,
	template: {
		define: "NR.define"
	}
}
```

## Install

```bash
npm install bodule
```