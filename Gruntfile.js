module.exports = function(grunt){

	//	Regarder l'API Grunt.File pour lire automatiquement les templates des modules et leurs config 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint:{
			all: ['Gruntfile.js', 'app/js/*.js', 'lib/**/*.js', 'modules/**/*.js']
		},
		browserify: {
	      	lib: {
		        files: {
		          './prod/app.js': ['./vendor/js/validate.js', './vendor/js/app.js','./vendor/js/jquery-ui.js']
		        },
		        options: {
		          transform: ['hbsfy', 'browserify-shim']
	        	}
	      	}
	    },
	    uglify: {
		    dist: {
		      	files: {
		        	'./prod/app.js': ['./prod/app.js'] // 'vendor/js/jquery*.js', 'vendor/js/underscore*.js', 'vendor/js/*.js', 
		      	}
		    }
		},

		cssmin: {
			dist: {
			    files: {
			      'prod/min.css': ['app/css/*.css', 'modules/**/*.css','vendor/css/*.css']
				}
			}
		},

	});

	// Load all plugins 
	require('load-grunt-tasks')(grunt);
	grunt.registerTask('default',['jshint', 'browserify:lib']);
	grunt.registerTask('prod',['jshint', 'browserify:lib', 'uglify', 'cssmin']);
};