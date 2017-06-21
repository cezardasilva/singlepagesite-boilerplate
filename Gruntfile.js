module.exports = function(grunt) {
	"use strict";
	grunt.initConfig({
		pkg: require("./package.json"),
		watch: {
			sass: {
				files: ['static/scss/**/*.scss'],
				tasks: ['sass', 'postcss', 'cssmin']
			}
		},
		sass: {
			dist: {
				options: {
					trace: true
				},
				files: {
					'static/css/main.css' : 'static/scss/main.scss'
				}
			}
		},
		jshint: {
			code: {
				src: ['Gruntfile.js'],
				options: {
					expr: true,
					multistr: false,
					globals: {
						module: true
					}
				}
			},
		},
		imagemin: {
			dynamic: {                         // Another target
				files: [{
					expand: true,                  // Enable dynamic expansion
					cwd: 'static/images/',                   // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif,ico,xml,json}'],   // Actual patterns to match
					dest: 'static/images/'                  // Destination path prefix
				}]
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'static/css/main.min.css': ['static/css/main.css']
				}
			}
		},
		postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')
                ]
            },
            dist: {
                src: 'static/css/*.css'
            }
        }
	});

	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-postcss');

	grunt.registerTask('build', ['sass', 'postcss', 'cssmin', 'imagemin']);

	return grunt;
};
