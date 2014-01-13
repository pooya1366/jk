module.exports = function (grunt) {
	grunt.initConfig({
		//loading project config file
		pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            vents: {
                files : [
                    {
                        src: ['js/src/handlers/*.common.js', 'js/src/events/*.common.js'],
                        dest: 'js/dist/vents/commonVents.js'
                    },
                    {
                        src: ['js/src/handlers/compare.js', 'js/src/events/compare.js'],
                        dest: 'js/dist/vents/compare.js'
                    }
                ]
            },
            plugins: {
                src: [
                        'js/src/plugins/*.common.js',
                        'js/libs/typeahead.js/dist/typeahead.js'
                     ],
                dest: 'js/dist/plugins/commonPlugins.js'
            },
            bootstrap: {
                src: [
                    'js/libs/bootstrap/js/transition.js',
                    'js/libs/bootstrap/js/modal.js'
                ],
                dest: 'js/dist/libs/bootstrap.js',
                nonull: true
            },
            critical: {
                src: [
                    'js/libs/jquery/jquery.js',
                    'js/src/extras/noConflict.js',
                    'js/src/plugins/*.critical.js',
                    'js/src/handlers/*.critical.js',
                    'js/src/events/*.critical.js',
                    'js/libs/typeahead.js/test/vendor/hogan-2.0.0.js',
                    'js/libs/typeahead.js/dist/typeahead.min.js'
                ],
                dest: 'js/dist/critical.js',
                nonull: true
            }
        },

        uglify: {
            bootstrap : {
                src : 'js/dist/libs/bootstrap.js',
                dest : 'js/dist/libs/bootstrap.min.js'
            },
            critical : {
                src : 'js/dist/critical.js',
                dest : 'js/dist/critical.min.js'
            }
        },

        less: {
            production: {
                options : {
                    cleancss: true
                },
                files: [
                    { expand: true, cwd: 'less/jk', src: '**/*-page.less', dest: 'css/', ext: '.css' },
                    {src: ['less/jk/jk.less',
                            'js/libs/fancyBox/source/jquery.fancybox.css',
                            'js/libs/flexSlider/flexslider.css',
                            'js/libs/fancyBox/source/helpers/jquery.fancybox-thumbs.css',
                            'less/overwrites/*.less'
                          ],
                        dest: 'css/styles.css'}
                ]
            }
        },

        watch: {
            themes: {
                files: ['less/**/*.less'],
                tasks: ['less:production']
            },
            vents: {
                files: ['js/src/events/*.js', 'js/src/handlers/*.js'],
                tasks: ['concat:vents']
            },
            join: {
                files: ['js/src/**/*.js'],
                tasks: ['concat:vents', 'concat:plugins', 'concat:critical']
            }
        },

        bower: {
            libs: {
                options: {
                    cleanBowerDir: false,
                    verbose: true,
                    copy: false
                }
            }
        },

        copy: {
            libs: {
                files: [
                    {expand: true, src: ['*.less'], dest: 'less/bootstrap', cwd: 'bower_components/bootstrap/less/'},
                    {expand: true, src: ['**'], dest: 'js/libs/', cwd: 'bower_components/'}
                ]
            }
        },

        clean: {
            libs: ['bower_components']
        }

    });

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('assemble-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

	//task registration
  	grunt.registerTask('default', ['concat:vents']);

    grunt.registerTask('getLibs', ['bower:libs','copy:libs', 'clean:libs']);

  	grunt.registerTask('join', ['concat:vents', 'concat:plugins', 'concat:critical']);
  	grunt.registerTask('makeTheme', ['less:production']);
  	grunt.registerTask('makePlugins', ['concat:plugins']);
  	grunt.registerTask('watchTheme', ['watch:themes']);
  	grunt.registerTask('watchVents', ['watch:vents']);
  	grunt.registerTask('bootstrap', ['concat:bootstrap', 'uglify:bootstrap']);

}