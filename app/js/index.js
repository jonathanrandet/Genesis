$(function(){

	/**
	* Number.prototype.format(n, x, s, c)
	* 
	* @param integer n: length of decimal
	* @param integer x: length of whole part
	* @param mixed   s: sections delimiter
	* @param mixed   c: decimal delimiter
	*/
	Number.prototype.format = function(n, x, s, c) {
	    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
	        num = this.toFixed(Math.max(0, ~~n));
	
	    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
	};
	
	(12345678.9).format(3, 3, '.', ',');  // "12.345.678,90"
	(123456.789).format(4, 4, ' ', ':');  // "12 3456:7890"
	console.log((12345678.9).format(0, 3, '-'));       // "12-345-679"

	
	//window.$ = jQuery; 	// Enlever cette ligne de la !!!
	$('#test').tooltip({placement: 'bottom'});
	//$(document).once('myEvent', function(e, args){
	$(document).on('myEvent', function(e, args){
		console.log(args);
	});
	$(document).trigger('myEvent', 'Je suis un chef');


/*	var PageView = require('../../lib/views/PageView');
	var datast = {};
	datast.name = 'accueil';
	var testamos = new PageView(datast);*/


	//var collection = require('../../lib/collections/ModuleCollection');
	//var testi = new collection(ModuleModel);
	//console.log(testi.toJSON());

/*	var Genesis = require('../../lib/views/AppView');
	var app = new Genesis();*/

	var app = require('../../lib/views/AppView');

	var tito = require('../../lib/views/AppView');

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

/*	var ModuleModel = require('../../lib/models/ModuleModel');
	var data = require('../../modules/Auteur/config');
	moduleAuteur = new ModuleModel({},data);

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
	maNewVue.render();*/
	app.addAction('addModel', function(e, isValid, model){
		if(isValid){
			console.log(model);
			console.log('Joe Calagan !!');
			alert('God is great');
		}
	});
	// Test singleton
	//tito.addModel();
	var taa = require('../../lib/models/Request');

	var qsel_Article = new taa({},{
		url: 'localhost',
		method: 'Post',
		limit: 100,
		offset: 0
	});

	console.log('Request',qsel_Article);

/*	app.Modules.auteur.views.addView.render();
	app.Modules.auteur.views.listView.render();
	app.Modules.auteur.views.searchView.render();*/

	//alert('Bienvenu Jonathan !!');

});
