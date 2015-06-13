module.exports = function(grunt){
 
	var fs 			= grunt.file;
	var _			= require('underscore');
	var rootdir 	= './modules';
	var rootdirPage = './app/tpl';
	var manifest 	= './lib/manifest.js';
	var content		= '';
	var pages		= '';
	var models 		= '';
	var headers		= [];
	var footers		= [];
	var navs		= [];
	var structures  = {};
	var	allIsOk		= true;

	function callback(abspath, rootdir, subdir, filename){
		if(subdir !== undefined && subdir.indexOf('/') === -1){
			var path = rootdir+'/'+subdir+'/tpl';
			if(fs.isDir(path)){
				generateModuleConfig(subdir, rootdir, path);
			}
		}
	}

	function callbackPage(abspath, rootdir, subdir, filename){
		if(fs.isDir(filename) !== undefined){
			generateModelsStructure(abspath, filename);
		}
		else{
			console.log('Gerer le fait qu\'il n y ai pas de page');
		}
	}

	function generateModuleConfig(subdir, rootdir, path){
		var isOk = false;
		
		if(fs.isFile(rootdir+'/'+subdir+'/config.js')){
			content += subdir+': {\n';
			content	+= '\tconfig: require(\'../modules/'+subdir+'/config\'),\n';
			isOk = true;
		}

		if (isOk){
			content += '\ttemplates: {\n';
			if(fs.isFile(path+'/AddTemplate.hbs')){
				content += '\t\taddview: require(\'../modules/'+subdir+'/tpl/AddTemplate.hbs\'),\n';	
			}
			if(fs.isFile(path+'/EditTemplate.hbs')){
				content += '\t\teditview: require(\'../modules/'+subdir+'/tpl/EditTemplate.hbs\'),\n';	
			}
			if(fs.isFile(path+'/ListTemplate.hbs')){
				content += '\t\tlistview: require(\'../modules/'+subdir+'/tpl/ListTemplate.hbs\'),\n';	
			}
			if(fs.isFile(path+'/SearchTemplate.hbs')){
				content += '\t\tsearchview: require(\'../modules/'+subdir+'/tpl/SearchTemplate.hbs\')\n';	
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

	function generateModelsStructure(path,filesname){
		var isOk = false;
		var filename = filesname.toLowerCase();
		var name = '';
		var isModel 	= filename.indexOf('model-') !== -1  || filename.indexOf('model.hbs') !== -1;
		var isFooter 	= filename.indexOf('footer-') !== -1 || filename.indexOf('footer.hbs') !== -1;
		var isHeader 	= filename.indexOf('header-') !== -1 || filename.indexOf('header.hbs') !== -1;
		var isNav 		= filename.indexOf('nav-') !== -1 	 || filename.indexOf('nav.hbs') !== -1;
		var isPage		= !isModel && !isHeader && !isFooter && !isNav;

		if(isModel){
			if(filename === 'model.hbs'){
				structures['default'] = filesname;
			}
			else{
				name = filename.split('.')[0].split('-')[1];
				structures[name] = filesname;
			}
		}
		if(isHeader){
			if(filename === 'header.hbs'){
				headers['default'] = filesname;
			}
			else{
				name = filename.split('.')[0].split('-')[1];
				headers[name] = filesname;
			}
		}
		if(isFooter){
			if(filename === 'footer.hbs'){
				footers['default'] = filesname;
			}
			else{
				name = filename.split('.')[0].split('-')[1];
				footers[name] = filesname;
			}
		}
		if(isNav){
			if(filename === 'nav.hbs'){
				navs['default'] = filesname;
			}
			else{
				name = filename.split('.')[0].split('-')[1];
				navs[name] = filesname;
			}
		}
		if(isPage){
			name = filename.split('.')[0];
			pages += name+': {\n';
			pages += '\tname: \''+name+'\',\n';
			pages += '\turl: \''+name+'\',\n';
			pages += '\ttemplate: require(\'../'+path+'\')\n';
			pages += '},\n';
		}
		
		return isOk;
	}

	function generateModelJSON(){
		_.each(structures, function(model, name){
			var header = headers[name] || headers['default'];
			var footer = footers[name] || footers['default'];
			var nav    = navs[name] || navs['default'];
			models+= name+': {\n';
			models+= '\tname: \''+name+'\',\n';
			models+= '\tstructure: require(\'../app/tpl/'+model+'\'),\n';
			models+= '\theader: require(\'../app/tpl/'+header+'\'),\n';
			models+= '\tfooter: require(\'../app/tpl/'+footer+'\'),\n';
			models+= '\tnav: require(\'../app/tpl/'+nav+'\')\n';
			models+= '}, \n';
		
		});
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
	fs.recurse(rootdirPage, callbackPage);
	fs.recurse(rootdir, callback);
	generateModelJSON();
	console.log(models);
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