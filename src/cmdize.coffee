module.exports = (path, code, deps, pkg, opt) ->
    packageId = "#{pkg.name}@#{pkg.version}" 
    moduleId = packageId + path
    moduleId = moduleId.slice 0, -3

    useStrict = if opt.useStrict
        "'use strict';"
    else
        ""

    deps = deps.map (dep) ->
        if pkg.dependencies?
            if pkg.dependencies[dep]?
                dep = "#{dep}@#{pkg.dependencies[dep]}"
        "'#{dep}'"
    .join(', ')

    """
    #{opt.template.define}('#{moduleId}', [#{deps}], function (require, exports, module) {
        #{useStrict}
        #{code.split('\n').join('\n    ')}    
    })
    """
