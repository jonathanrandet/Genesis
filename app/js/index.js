$(function(){
	//window.$ = jQuery; 	// Enlever cette ligne de la !!!
	$('#test').tooltip({placement: 'bottom'});

	var ModuleModel = require('../../lib/models/ModuleModel');
	var data = require('../../modules/Auteur/config');
	moduleAuteur = new ModuleModel(data);

	console.log(moduleAuteur.FieldList[0].type); 

	var AddView = require('../../lib/views/AddView');
	var maVue = new AddView({
		model: moduleAuteur,
		template: require('../../modules/Auteur/tpl/AddTemplate.hbs')
	});
	maVue.render();
	console.info(moduleAuteur.DataCollection);

	var ListView = require('../../lib/views/ListView');
	var maNewVue = new ListView({
		model: moduleAuteur,
		template: require('../../modules/Auteur/tpl/ListTemplate.hbs')
	});
	maNewVue.render();

	alert('Bienvenu Jonathan');

});