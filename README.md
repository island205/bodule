Bodule ['bɑdʒul]
======

Bodule是一个将Node包导入给浏览器端的解决方案，本repo是该方案的核心——将一个node模块cmd化。

### API

`bodule(path, code, pkg)`

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

### 安装

```bash
npm install bodule
```
