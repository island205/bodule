# bodule path, code, pkg, opt
U2 = require 'uglify-js'
deepMerge = require 'deepmerge'

options =
  userStrict: false
  template:
    define: 'define'

module.exports = (path, code, pkg = {}, opt = {})->
  deps = []
  opt = deepMerge options, opt

  walker = new U2.TreeWalker (node, descend)->
    if node instanceof U2.AST_Call and node.expression.name is 'require'
      args = node.expression.args or node.args
      child = args[0]
      if child instanceof U2.AST_String
        deps.push child.getValue()

  ast = U2.parse code
  ast.walk walker

  packageId = "#{pkg.name}@#{pkg.version}"
  moduleId = packageId + path
  moduleId = moduleId.replace /\.js$/, ''

  useStrict = "'use strict;'"

  if not opt.useStrict
    useStrict = ''

  if pkg.dependencies?
    deps = deps.map (dep)->
      if pkg.dependencies[dep]?
        dep = "#{dep}@#{pkg.dependencies[dep]}"
      dep

  deps = deps.map (dep)->
    "'#{dep}'"

  """
  #{opt.template.define}('#{moduleId}', [#{deps.join(', ')}], function (require, exports, module) {
    #{useStrict}
    # indent for readability
    #{code.split('\n').join('\n    ')}
  })
  """
