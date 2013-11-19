module.exports = function (grunt) {
	grunt.initConfig({
		//loading project config file
		pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            commonVents: {
                src: ['js/src/handlers/*.common.js',
                      'js/src/events/*.common.js'],
                dest: 'js/dist/vents/commonEvents.js'
            },
            plugins: {
                src: ['js/src/plugins/*.common.js'],
                dest: 'js/dist/plugins/commonPlugins.js'
            }
        },

        less: {
            production: {
                options : {
                    cleancss: true
                },
                files: {
                    'css/style.css' : 'less/jk/jk.less'
                }
            }
        }

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');

	//task registration
  	grunt.registerTask('default', ['concat:commonVents']);
  	grunt.registerTask('join', ['concat:commonVents', 'concat:plugins']);
  	grunt.registerTask('makeTheme', ['less:production']);

}