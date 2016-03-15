'use strict';
module.exports = function(grunt) {

	// load all grunt tasks matching the `grunt-*` pattern
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Watch for changes and trigger less, jshint, uglify and livereload
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['assets/js/src/*.js'],
				tasks: ['jshint', 'uglify']
			},
			styles: {
				files: ['assets/less/*.less'],
				tasks: ['less:cleancss', 'autoprefixer']
			}
		},

		less: {
			cleancss: {
				options: {
					cleancss: true
				},
				files: {
					'assets/css/public.css': 'assets/less/public.less',
					'assets/css/old-ie.css': 'assets/less/old-ie.less'

				}
			}
		},

		// PostCSS handles post-processing on CSS files. Used here to autoprefix and minify.
		postcss: {
			options: {
				map: {
					inline: false, // save all sourcemaps as separate files...
					annotation: 'assets/css/' // ...to the specified directory
				},
				processors: [
					require('autoprefixer')(),
					require('cssnano')
				]
			},
			dist: {
				src: 'assets/css/*.css'
			}
		},

		// JavaScript linting with jshint
		jshint: {
			all: [
				'assets/js/src/*.js'
				]
		},

		// Uglify to concat, minify, and make source maps
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
						'<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			common: {
				files: {
					'assets/js/public.min.js': ['assets/js/src/*.js']
				}
			}
		},

		// Image optimization
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 7,
					progressive: true,
					interlaced: true
				},
				files: [{
					expand: true,
					cwd: 'assets/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'assets/img/'
				}]
			}
		}

	});

	// Register tasks
	// Typical run, cleans up css and js, starts a watch task.
	grunt.registerTask('default', ['less:cleancss', 'autoprefixer', 'jshint', 'uglify:common', 'watch']);

	// Before releasing a build, do above plus minimize all images.
	grunt.registerTask('build', ['less:cleancss', 'autoprefixer',  'jshint', 'uglify:common', 'imagemin']);

};