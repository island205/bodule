var bodule = require('../')
var assert = require("chai").assert;

describe('wrapCode', function(){
  describe('#indexOf()', function(){
    it('require with assignment', function(){
        var wrapCode = bodule('/b.js', 'var a = require("a");', {
            name: 'bodule',
            version: '0.1.0',
            dependencies: {
                'a': '0.0.1',
                'xxxxx': '0.0.2'
            }
        });

        var expected = "define('bodule@0.1.0/b.js', ['a@0.0.1'], function (require, exports, module) {\n"
                    +"    var a = require(\"a\");    \n"
                    +"})";
        assert.equal(wrapCode,expected);
    })

    it('require without assignment', function(){
        var wrapCode = bodule('/b.js', 'var a = require("a"); require("xxxxx")', {
            name: 'bodule',
            version: '0.1.0',
            dependencies: {
                'a': '0.0.1',
                'xxxxx': '0.0.2'
            }
        });

        var expected = "define('bodule@0.1.0/b.js', ['a@0.0.1', 'xxxxx@0.0.2'], function (require, exports, module) {\n"
                    +"    var a = require(\"a\"); require(\"xxxxx\")    \n"
                    +"})";
        assert.equal(wrapCode,expected);
    })
  })
})
