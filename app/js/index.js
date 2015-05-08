$(function(){
	//window.$ = jQuery; 	// Enlever cette ligne de la !!!
	$('#test').tooltip({placement: 'bottom'});

	var ModuleModel = require('../../lib/models/ModuleModel');
	var data = require('../../modules/Auteur/config');
	moduleAuteur = new ModuleModel(data);

	console.log(moduleAuteur.FieldList[0].type); //  Voir si FieldList ne doit pas etre un toJSON

	var AddView = require('../../lib/views/AddView');
	var maVue = new AddView({
		el: '#addview',
		model: moduleAuteur,
		template: require('../../modules/Auteur/tpl/AddTemplate.hbs')
	});
	maVue.render();
	console.info(moduleAuteur.DataCollection);

	alert('Bienvenu Jonathan');

});