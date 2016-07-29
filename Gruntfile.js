'use strict';
module.exports = function(grunt)
{

	/**
	 * Muestra el tiempo de ejecución de cada tarea
	 * https://www.npmjs.com/package/time-grunt
	 */
	require('time-grunt')(grunt);

	/**
	 * Carga automaticamente las tareas
	 * https://www.npmjs.com/package/load-grunt-tasks
	 */
	require('load-grunt-tasks')(grunt);

	/**
	 * Configuracion principal
	 */
	grunt.config.init(
	{
		pkg: grunt.file.readJSON('./package.json'),

		/**
		 * Limpia los directorios
		 * https://www.npmjs.com/package/grunt-contrib-clean
		 */
		clean: ['dist'],

		/**
		 * Verifica que los archivos js cumplan los estandares definidos
		 * https://www.npmjs.com/package/grunt-contrib-jshint
		 */
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				ignores: []
			},
			all: [
				'Gruntfile.js',
				'src/js/*.js'
			]
		},

		/**
		 * Minifica los archivos js
		 * https://www.npmjs.com/package/grunt-contrib-uglify
		 */
		uglify: {
			development: {
				options: {
					compress: {
						collapse_vars: true,
						dead_code: true,
						//drop_console: true,
						drop_debugger: true
					},
					//banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
					preserveComments: false,
					quoteStyle: 1
				},
				files: [{
					expand: true,
					src: '*.js',
					dest: 'dist/js',
					cwd: 'src/js',
					ext: '.min.js'
				}]
			}
		},

		/**
		 * Copia las librerias js
		 * https://www.npmjs.com/package/grunt-contrib-copy
		 */
		copy: {
			development: {
				options: {
					//
				},
				files: [{
					expand: true,
					flatten: true,
					src: [
						'bower_components/requirejs/require.js',
						'bower_components/jquery/dist/jquery.min.js',
						'bower_components/bootstrap/dist/js/bootstrap.min.js'
					],
					dest: 'dist/js/vendor/',
					filter: 'isFile'
				}]
			}
		},

		/**
		 * Compila los archivos less
		 * https://www.npmjs.com/package/grunt-contrib-less
		 */
		less: {
			development: {
				options: {
					paths: ['src/css'],
					compress: true,
					strictImports: true,
					syncImport: true,
					sourceMap: false
				},
				files: {
					'dist/css/app.min.css': ['src/css/app.less']
				}
			}
		},

		/**
		 * Comprime las imagenes y las copia al directorio dist
		 * https://www.npmjs.com/package/grunt-contrib-imagemin
		 */
		imagemin: {
			development: {
				options: {
					optimizationLevel: 3,
					use: [require('imagemin-jpegtran')(), require('imagemin-optipng')()]
				},
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/'
				}]
			}
		},

		/**
		 * Minifica los archivos html
		 * https://www.npmjs.com/package/grunt-contrib-htmlmin
		 */
		htmlmin: {
			development: {
				options: {
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeComments: true,
					removeScriptTypeAttributes: true
				},
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*.html'],
					dest: 'dist/'
				}]
			}
		},

		/**
		 * Observa cambios en los archivos fuente
		 * https://www.npmjs.com/package/grunt-contrib-watch
		 */
		watch: {
			css: {
				files: ['src/css/*.less'],
				tasks: ['less'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			img: {
				files: ['src/img/*.{png,jpg,gif}'],
				tasks: ['imagemin'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			js: {
				files: ['src/js/*js'],
				tasks: ['uglify'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			html: {
				files: ['src/**/*.html'],
				tasks: ['htmlmin'],
				options: {
					spawn: false,
					livereload: true
				}
			}
		}
	});

	/**
	 * Tarea por defecto
	 */
	grunt.registerTask('default',
		['clean', 'jshint', 'uglify', 'copy', 'less', 'imagemin', 'htmlmin', 'watch']
	);
};
