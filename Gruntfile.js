module.exports = function(grunt){
 
	var fs 			= grunt.file;
	var rootdir 	= './modules';
	var manifest 	= './modules/manifest.js';
	var content		= '';
	var	allIsOk		= true;

	function callback(abspath, rootdir, subdir, filename){
		if(subdir !== undefined && subdir.indexOf('/') === -1){
			var path = rootdir+'/'+subdir+'/tpl';
			if(fs.isDir(path)){
				generateModuleConfig(subdir, rootdir, path);
			}
		}
	}

	function generateModuleConfig(subdir, rootdir, path){
		var isOk = false;
		
		if(fs.isFile(rootdir+'/'+subdir+'/config.js')){
			content += subdir+': {\n';
			content	+= '\tconfig: require(\'./'+subdir+'/config\'),\n';
			isOk = true;
		}

		if (isOk){
			content += '\ttemplates: {\n';
			if(fs.isFile(path+'/AddTemplate.hbs')){
				content += '\t\taddview: require(\'./'+subdir+'/tpl/AddTemplate.hbs\'),\n';	
			}
			if(fs.isFile(path+'/EditTemplate.hbs')){
				content += '\t\teditview: require(\'./'+subdir+'/tpl/EditTemplate.hbs\'),\n';	
			}
			if(fs.isFile(path+'/ListTemplate.hbs')){
				content += '\t\tlistview: require(\'./'+subdir+'/tpl/ListTemplate.hbs\'),\n';	
			}
			if(fs.isFile(path+'/SearchTemplate.hbs')){
				content += '\t\tsearchview: require(\'./'+subdir+'/tpl/SearchTemplate.hbs\')\n';	
			}
			content += '\t}\n},\n';
			console.log('');
			console.info('\'Config\' : Module \''+subdir+'\' configuration ... OK !');
		}
		else{
			console.log('');
			console.error('\'Config\' : Module \''+subdir+'\' configuration ... FAIL !!!');
			console.error('\'Config\' : Module \''+subdir+'\' requires a config file : '+rootdir+'/'+subdir+'/config.js');
			allIsOk = false;
		}
		
		return isOk;
	}

	function createManifest(manifest, content){
		var isOk = false;
		if(fs.exists(manifest)){
			isOk = fs.delete(manifest);
			if(isOk){
				console.info('\'Manifest\' : The old file was deleted ... OK !');
			}
		}
		isOk = fs.write(manifest, content);
		if(isOk){
			console.log('');
			console.info('\'Manifest\' : The new file was created ... OK !');
		}else {
			console.log('');
			console.error('\'Manifest\' : The old file was created ... FAIL !!!');
			console.error('\'Manifest\' : Try to do a new grunt commande line');
		}
	}

	function appConfigExist(){
		var isOk = fs.exists('./app/app.js');
		return isOk;
	}

	// app config file exist ?
	if(appConfigExist()){
		console.log('');
		console.info('\'App\' : App config file exist ... OK ! ');
	}else{
		console.log('');
		console.error('\'App\' : App config file exist ... FAIL !!! ');
		console.error('\'App\' : You must create an app config file : ./app/app.js');
	}


	// Manifest file generation
	fs.recurse(rootdir, callback);
	content = 'module.exports = {\n' + content.substring(0, content.length-2)+ '\n};';
	
	// If all is well
	if(allIsOk){
		createManifest(manifest, content);

		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			jshint:{
				all: ['Gruntfile.js', 'app/js/*.js', 'lib/**/*.js', 'modules/**/*.js']
			},
			browserify: {
		      	lib: {
			        files: {
			          './prod/app.js': ['./vendor/js/validate.js','./vendor/js/*.js', './app/**/*.js','./lib/js/*.js']
			        },
			        options: {
			          transform: ['hbsfy', 'browserify-shim']
		        	}
		      	}
		    },
		    uglify: {
			    dist: {
			      	files: {
			        	'./prod/app.js': ['./prod/app.js']
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
		grunt.registerTask('default',['jshint', 'browserify:lib','cssmin']);
		grunt.registerTask('prod',['jshint', 'browserify:lib', 'uglify', 'cssmin']);
	}

};