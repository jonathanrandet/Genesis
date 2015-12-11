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


	function addslashes(str) {
		//  discuss at: http://phpjs.org/functions/addslashes/
		// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// improved by: Ates Goral (http://magnetiq.com)
		// improved by: marrtins
		// improved by: Nate
		// improved by: Onno Marsman
		// improved by: Brett Zamir (http://brett-zamir.me)
		// improved by: Oskar Larsson Högfeldt (http://oskar-lh.name/)
		//    input by: Denny Wardhana
		//   example 1: addslashes("kevin's birthday");
		//   returns 1: "kevin\\'s birthday"

		return (str + '')
		.replace(/[\\"']/g, '\\$&')
		.replace(/\u0000/g, '\\0');
	}

	
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

	var rh = require('Class')('autEuR');
	console.log(rh);

	var tm = new rh();
	console.log('config', tm.idField);
	console.log('config', tm.tableName);
	
	var app = require('Genesis');

	var tito = require('Genesis');

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
	app.addAction('addModel', function(e, model, isValid){
		if(isValid){
			console.log(model);
			console.log('Joe Calagan !!');
			alert('God is great');
		}
	});

	// Test singleton
	// tito.addModel();
	
	var taa = require('../../lib/models/Request');

	var qsel_Article = new taa({},{
		url: 'localhost',
		method: 'Post',
		limit: 100,
		offset: 0
	});

	var toto = [
		{nom: 'randet', age: 24, prenom: 'jonathan'},
		{nom: 'randet', age: 23, prenom: 'joelle'},
		{nom: 'randet', age: 19, prenom: 'nicolas'},
		{nom: 'jackson', age: 27}
	];

	qsel_Article.datas.set(toto);
	var tata = qsel_Article.datas.search({nom: 'randet', prenom: 'jonathan'});

	var tuts = tata.first();
	while (!tata.end){
		console.log(tuts.attributes);
		tuts = tata.next();
	}

	console.log('Request',qsel_Article);


	var RemoteDb = require('../../lib/models/RemoteDb');

	var qsel_Articles = new RemoteDb();
	qsel_Articles.params.type = 'GET';
	qsel_Articles.params.url = 'http://localhost/myapiprojects/test/';
	//qsel_Article.params.data = {nom: 'jonathan', id: 'titi'};
	qsel_Articles.onSuccess(function(responseText, state, xhr){
		//console.log(y);
		//x = JSON.parse(x);
		console.log(responseText, state, xhr);
	});

	qsel_Articles.onError(function(xhr, state, statusText){
		//console.log(y);
		//x = JSON.parse(x);
		console.log(xhr, state, statusText);
	});
	qsel_Articles.run();

/*	app.Modules.auteur.views.addView.render();
	app.Modules.auteur.views.listView.render();
	app.Modules.auteur.views.searchView.render();*/

	//alert('Bienvenu Jonathan !!');

});
