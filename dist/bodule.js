(function() {
  var U2, deepMerge, options;

  U2 = require('uglify-js');

  deepMerge = require('deepmerge');

  options = {
    userStrict: false,
    template: {
      define: 'define'
    }
  };

  module.exports = function(path, code, pkg, opt) {
    var addVersion, ast, deps, moduleId, packageId, trans, useStrict, walker;
    if (pkg == null) {
      pkg = {};
    }
    if (opt == null) {
      opt = {};
    }
    deps = [];
    opt = deepMerge(options, opt);
    walker = new U2.TreeWalker(function(node, descend) {
      var args, child;
      if (node instanceof U2.AST_Call && node.expression.name === 'require') {
        args = node.expression.args || node.args;
        child = args[0];
        if (child instanceof U2.AST_String) {
          return deps.push(child.getValue());
        }
      }
    });
    ast = U2.parse(code);
    ast.walk(walker);
    addVersion = function(id) {
      if (typeof pkg.dependencies[id] !== 'undefined') {
        id = "" + id + "@" + pkg.dependencies[id];
      }
      return id;
    };
    trans = new U2.TreeTransformer(function(node, descend) {
      if (node instanceof U2.AST_Call && node.expression.name === 'require' && node.args.length) {
        return node.args.forEach(function(arg) {
          return arg.value = addVersion(arg.getValue());
        });
      }
    });
    ast = ast.transform(trans);
    code = ast.print_to_string({
      beautify: true,
      comments: true
    });
    packageId = "" + pkg.name + "@" + pkg.version;
    moduleId = packageId + path;
    moduleId = moduleId.replace(/\.js$/, '');
    useStrict = "'use strict;'";
    if (!opt.useStrict) {
      useStrict = '';
    }
    if (pkg.dependencies != null) {
      deps = deps.map(function(dep) {
        if (typeof pkg.dependencies[dep] !== 'undefined') {
          dep = "" + dep + "@" + pkg.dependencies[dep];
        }
        return dep;
      });
    }
    deps = deps.map(function(dep) {
      return "'" + dep + "'";
    });
    return "" + opt.template.define + "('" + moduleId + "', [" + (deps.join(', ')) + "], function (require, exports, module) {\n  " + useStrict + "\n  # indent for readability\n  " + (code.split('\n').join('\n    ')) + "\n})";
  };

}).call(this);
