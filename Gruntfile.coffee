module.exports = (grunt) ->
    grunt.initConfig
        watch:
            scripts:
                files:['src/*.coffee'],
                tasks:['coffee']
        coffee:
            compile:
                options:
                    join: true
                files:
                    'dist/bodule.js': ['src/*.coffee']

    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-watch'

    grunt.registerTask 'default', ['coffee', 'watch']
