$(function(){
	//window.$ = jQuery; 	// Enlever cette ligne de la !!!
	$('#test').tooltip({placement: 'bottom'});

/*	var ModuleModel = require('../../lib/models/ModuleModel');
	var data = require('../../modules/Auteur/config');
	moduleAuteur = new ModuleModel(data);

	var AddView = require('../../lib/views/AddView');
	var maVue = new AddView({
		model: moduleAuteur,
		template: require('../../modules/Auteur/tpl/AddTemplate.hbs')
	});
	maVue.render();

	var ListView = require('../../lib/views/ListView');
	var maNewVue = new ListView({
		model: moduleAuteur,
		template: require('../../modules/Auteur/tpl/ListTemplate.hbs')
	});
	maNewVue.render();

	var PageView = require('../../lib/views/PageView');
	var datast = {};
	datast.name = 'accueil';
	var testamos = new PageView(datast);*/


	//var collection = require('../../lib/collections/ModuleCollection');
	//var testi = new collection(ModuleModel);
	//console.log(testi.toJSON());

	var Genesis = require('../../lib/views/AppView');
	var app = new Genesis();

	app.start();
	console.log(app);

	alert('Bienvenu Jonathan');


});