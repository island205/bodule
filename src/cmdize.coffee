module.exports = (path, code, deps, _package) ->
    packageId = "#{_packege.name}@#{_package.version}" 
    moduleId = packegeId + path

    deps = deps.map (dep) ->
        "'#{dep}@#{_packege.dependencies[dep]}'"
        .join(', ')

    """
    define('#{moduleId}', [#{deps}], function (require, exports, module) {
        #{code.split('\n').join('\n    ')}    
    })
    """
