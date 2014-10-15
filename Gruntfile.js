module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var configPath = {
        public_mobile: 'mobile/www',
        dev: 'frontend_dev'
    };

    // Project configuration.
    grunt.initConfig({

        configPath: configPath,

        clean: {
            public_mobile: '<%= configPath.public_mobile %>'
        },

        copy: {
        },

        concat: {
            options: {},
            dist: {
                src: [
                        '<%= configPath.dev %>' + '/app/bower_components/bootstrap/dist/css/bootstrap.min.css',
                        '<%= configPath.dev %>' + '/app/vendor/bootstrap/css/yeti.css',
                        '<%= configPath.dev %>' + '/app/bower_components/html5-boilerplate/css/normalize.css',
                        '<%= configPath.dev %>' + '/app/bower_components/html5-boilerplate/css/main.css',
                        '<%= configPath.dev %>' + '/app/css/app.css'
                ],
                dest: '<%= configPath.dev %>' + '/app/css/app.css'
            }
        },

        // Configuration to be run (and then tested).
        stylus: {
            compile: {
                options: {
                    compress: false
                },
                files: {
                    '<%= configPath.dev %>/app/css/app.css': '<%= configPath.dev %>/app/stylus/style.styl'
                }
            }
        },

        requirejs: {
            web: {
                options: {
                    baseUrl: ".",
                    mainConfigFile: "config.js",
                    name: "./frontend_dev/js/apps/web.js",
                    out: '<%= configPath.public_web %>' + "/js/script.js",
                    optimize: "none"
                }
            },
            mobile: {
                options: {
                    baseUrl: ".",
                    mainConfigFile: "config.js",
                    name: "./frontend_dev/js/apps/mobile.js",
                    out: '<%= configPath.public_mobile %>' + "/js/script.js",
                    optimize: "none"
                }
            }
        },

        //for Ripple development
        exec:{
            run:{
                command:"cd ./mobile; cordova run android",
                stdout:true,
                stderror:true
            }
        },

        watch: {

            develop: {
                tasks: ['develop'],
                files: [
                        '<%= configPath.dev %>'+'/app/stylus/*.styl'
                ]
            }
        }

    });

    // By default, lint and run all tests.
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('develop', [
        'stylus',
        'concat'
    ]);

    grunt.registerTask('md', [
        'production:mobile',
        'exec:run'
    ]);

    grunt.registerTask('production:web', [
        'clean:public_web',
        'stylus',
        'concat',
        'requirejs:web',
        'copy:web'
    ]);

    grunt.registerTask('production:mobile', [
        'clean:public_mobile',
        'stylus',
        'concat',
        'requirejs:mobile',
        'copy:mobile'
    ]);

    grunt.registerTask('production', [
        'production:web',
        'production:mobile'
    ])

};