module.exports = (path, code, deps, _package) ->
    packageId = "#{_package.name}@#{_package.version}" 
    moduleId = packageId + path

    deps = deps.map (dep) ->
        "'#{dep}@#{_package.dependencies[dep]}'"
    .join(', ')

    """
    define('#{moduleId}', [#{deps}], function (require, exports, module) {
        #{code.split('\n').join('\n    ')}    
    })
    """
