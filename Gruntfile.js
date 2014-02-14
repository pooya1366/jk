module.exports = function (grunt) {
	grunt.initConfig({
		//loading project config file
		pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            vents: {
                options: {
                    banner: "define(['commonPlugins'], function () {",
                    footer: '});'
                },
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
                options: {
                    banner: "define(function () { return (function() {",
                    footer: '})() });'
                },
                src: [
                        'js/src/plugins/*.common.js',
                        'js/libs/typeahead.js/dist/typeahead.js'
                    ],
                dest: 'js/dist/plugins/commonPlugins.js'
            },
            fancyBox: {
                src: [
                    'js/libs/fancyBox/source/jquery.fancybox.js',
                    'js/libs/fancyBox/source/helpers/jquery.fancybox-thumbs.js'
                ],
                dest: 'js/dist/plugins/fancyBox.js'
            },
            bootstrap: {
                src: [
                    'js/libs/bootstrap/js/transition.js',
                    'js/libs/bootstrap/js/modal.js',
                    'js/libs/bootstrap/js/dropdown.js'
                ],
                dest: 'js/dist/libs/bootstrap.js',
                nonull: true
            },
            critical: {
                src: [
                    'js/libs/jquery/jquery.js',
                    'js/libs/typeahead.js/dist/typeahead.js',
                    'js/libs/typeahead.js/test/vendor/hogan-2.0.0.js',
                    'js/src/extras/noConflict.js',
                    'js/src/plugins/*.critical.js',
                    'js/src/handlers/*.critical.js',
                    'js/src/events/*.critical.js'
                ],
                dest: 'js/dist/critical.js',
                nonull: true
            }
        },

        uglify: {
            critical : {
                src : '<%= concat.critical.dest %>',
                dest : 'js/dist/critical.min.js'
            },
            fancyBox: {
                src: '<%= concat.fancyBox.dest %>',
                dest: 'js/dist/plugins/fancyBox.min.js'
            },
            commonPlugins: {
                src: '<%= concat.plugins.dest %>',
                dest: 'js/dist/plugins/commonPlugins.min.js'
            },
            commonVents: {
                src: 'js/dist/vents/commonVents.js',
                dest: 'js/dist/vents/commonVents.min.js'
            },
            compare: {
                src: 'js/dist/vents/compare.js',
                dest: 'js/dist/vents/compare.min.js'
            },
            events: {
                files: {
                    'js/dist/events/affixEvent.min.js': 'js/src/events/affixEvent.js',
                    'js/dist/events/captionHeader.min.js': 'js/src/events/captionHeader.js',
                    'js/dist/events/categoryViewToggle.min.js': 'js/src/events/categoryViewToggle.js',
                    'js/dist/events/compare.min.js': 'js/src/events/compare.js',
                    'js/dist/events/modals.min.js': 'js/src/events/modals.js',
                    'js/dist/events/navScroller.min.js': 'js/src/events/navScroller.js',
                    'js/dist/events/scrollSpy.min.js': 'js/src/events/scrollSpy.js'
                }
            },
            handlers: {
                files: {
                    'js/dist/handlers/affixEvent.min.js': 'js/src/handlers/affixHandler.js',
                    'js/dist/handlers/captionHeader.min.js': 'js/src/handlers/captionHeader.js',
                    'js/dist/handlers/categoryViewToggle.min.js': 'js/src/handlers/categoryViewToggle.js',
                    'js/dist/handlers/compare.min.js': 'js/src/handlers/compare.js',
                    'js/dist/handlers/compareButton.min.js': 'js/src/handlers/compareButton.js',
                    'js/dist/handlers/scrollSpyHandler.min.js': 'js/src/handlers/scrollSpyHandler.js',
                    'js/dist/handlers/fancyBoxHandler.min.js': 'js/src/handlers/fancyBoxHandler.js'
                }
            },
            plugins: {
                files: {
                    'js/dist/plugins/affix.min.js': 'js/src/plugins/affix.js',
                    'js/dist/plugins/jQuery.jkNotification.min.js': 'js/src/plugins/jQuery.jkNotification.js',
                    'js/dist/plugins/scrollspy.min.js': 'js/src/plugins/affix.js',
                    'js/dist/plugins/stickySidebar.min.js': 'js/src/plugins/stickySidebar.js'
                }
            },
            libs: {
                files: {
                    'js/dist/libs/bootstrap.min.js': 'js/dist/libs/bootstrap.js',
                    'js/dist/libs/html5shiv.min.js': 'js/libs/html5shiv/dist/html5shiv.js',
                    'js/dist/libs/jquery.cookie.min.js': 'js/libs/jqueryCookie/jquery.cookie.js',
                    'js/dist/libs/modernizr.min.js': 'js/libs/modernizr/modernizr.js',
                    'js/dist/libs/requirejs.min.js': 'js/libs/requirejs/require.js',
                    'js/dist/plugins/scrollspy.min.js': 'js/libs/bootstrap/js/scrollspy.js'
                }
            }
        },

        less: {
            production: {
                options : {
                    cleancss: true
                },
                files: [
                    { expand: true, cwd: 'less/jk', src: '**/*-page.less', dest: 'css/', ext: '.css' },
                    {
                        src: ['less/jk/jk.less',
                            'js/libs/fancyBox/source/jquery.fancybox.css',
                            'js/libs/flexSlider/flexslider.css',
                            'js/libs/fancyBox/source/helpers/jquery.fancybox-thumbs.css',
                            'less/overwrites/*.less'
                          ],
                        dest: 'css/styles.css'
                    }
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

    grunt.registerTask('release', [
        'concat:vents',
        'concat:plugins',
        'concat:critical',
        'less:production',
        'uglify:critical',
        'uglify:fancyBox',
        'uglify:commonPlugins',
        'uglify:commonVents',
        'uglify:compare',
        'uglify:events',
        'uglify:handlers',
        'uglify:plugins',
        'uglify:libs'
    ]);
}