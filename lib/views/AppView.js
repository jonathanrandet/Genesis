var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = jQuery;

var CurrentUser = require('../models/CurrentUserModel');
var ModuleCollection = require('../collections/ModuleCollection');
var	PageView = require('./PageView');
var	ModelView = require('./ModelView');
var Router = require('../routers/Router');
var templates = require('../../lib/manifest');

module.exports = Backbone.View.extend({
	el: 'html',
	params: require('../../app/app.js'),
	initialize: initialize,
	createStructure: createStructure,
	loadPages: loadPages,
	addRoute: addRoute,
	start: start
	//toTemplateBindings: toTemplateBindings,
	//render: render
});

function initialize(data,init){
	if(!_.isUndefined(init) && _.isFunction(init)){
		this.init = init;
		if (!_.isUndefined(data)){
			this.init(data);
		}
		else{
			this.init();
		}
	}
	this.createStructure();
	//this.loadPages();
}

function createStructure(){
	var that = this;
	this.CurrentUser = new CurrentUser();
	this.Modules = new ModuleCollection();
	this.Router = new Router({ParentView: this});
	this.Pages = {};
	this.HeaderTemplates = {};
	this.FooterTemplates = {};
	this.NavigationTemplates = {};
	this.PageModel = {};

	var models = templates.models;
	var newModel = {};
	_.each(models,function(model){
		newModel = new ModelView({
			name: model.name,	//$$$	ICI, SE SOUVENIR QUE LE NAME DU PRINCIPAL DOIT ETRE default
			template: model.structure
		});
		newModel.setHeader(model.header);
		newModel.setFooter(model.footer);
		newModel.setNav(model.nav);
		that.PageModel[model.name] = newModel;
	});

	var pages = templates.pages;
	var newPage = {};
	_.each(pages,function(page){
		newPage = new PageView({
			name: page.name,
			route: page.url, 			//$$$   ICI, TROUVER UN MOYEN DE CREER DES ROUTES AVEC LE ROUTER
			template: page.template,
			ParentView: that
		});
		newPage.setPageModel('default'); //$$$   ICI, TROUVER UN NOM POUR LE MODEL DE BASE 
		that.Pages[page.name] = newPage;
	});

}

function loadPages(){
	var that = this;
	var $Pages = this.$el.find('[data-page]');
	_.each($Pages, function(page){
		var name = that.$(page).data('page');
		var url = that.$(page).data('url');
		// Ici gestion des droits
		var data = {};
		data.name = name;
		data.route = url;
		data.ParentView = that;
		that.Pages[name] = new PageView(data);
	});
}

function loadModules(){

}

function addRoute(route, action){
	if(!_.isUndefined(action) && _.isFunction(action)){
		this.Router.route(route, route, action);
	}
	else{
		throw new Error('addRoute : Your route need url and action');
	}
}

function start(){
	var firstPage = this.params.firstPage;
	if(!_.isUndefined(this.Pages[firstPage])){
		this.Pages[firstPage].render();	
	}
	else{
		throw new Error(' start : The page '+firstPage+' doesn\'t exist');
	}

}