$(function(){
	//window.$ = jQuery; 	// Enlever cette ligne de la !!!
	$('#test').tooltip({placement: 'bottom'});

	var ModuleModel = require('../../lib/models/ModuleModel');
	var data = require('../../modules/Auteur/config');
	test = new ModuleModel(data);

	console.log(test.FieldList.at(0).get('type'));
	alert('Bienvenu Jonathan');

});