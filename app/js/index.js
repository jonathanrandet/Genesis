$(function(){
	//window.$ = jQuery; 	// Enlever cette ligne de la !!!
	$('#test').tooltip({placement: 'bottom'});
	//$(document).once('myEvent', function(e, args){
	$(document).on('myEvent', function(e, args){
		console.log(args);
	});
	$(document).trigger('myEvent', 'Je suis un chef');
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


	app.initPage('test', actionTest);

	function actionTest(app, page){
		console.log(app.params);
		console.log(page.name);
		page.setModel('sansnom');
		alert('Bienvenu sur mon site !');
	}

	//console.log(app);
/*	var PageModel = require('../../lib/views/ModelView');
	var PageView  = require('../../lib/views/PageView');
	
	app.PageModel.tata = new PageModel({
		name: 'tata',
		template: require('../tpl/model.hbs')
	});

	app.PageModel.tata.setHeader(require('../tpl/Header.hbs'));
	app.PageModel.tata.setNav(require('../tpl/Nav.hbs'));
	app.PageModel.tata.setFooter(require('../tpl/Footer.hbs'));*/

/*	var Page = new PageView({
		name: 'accueil',
		ParentView: app
	});
	Page.template = require('../tpl/accueil.hbs');
	Page.setPageModel('tata');

	app.Pages.accueil = Page;


	var test = new PageView({
		name: 'tata',
		ParentView: app
	});*/

/*	test.template = require('../tpl/test.hbs');
	test.setPageModel('tata');*/

	//app.Pages.test = test;
	app.getPage('accueil').setModel('sansnom');
	//app.Pages.test.removeModel();
	//app.Pages.accueil.removeModel();
	app.getPage('accueil').setTitle('Bienvenue');
	app.getData(['ggffg', {}], {});
	app.start();
	//alert('Bienvenu Jonathan');


});