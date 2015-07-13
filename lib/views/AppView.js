var Backbone = require('backbone');
var _ = require('underscore');

var BaseView = require('./BaseView');
var CurrentUser = require('../models/CurrentUserModel');
var ModuleCollection = require('../collections/ModuleCollection');
var	PageView = require('./PageView');
var	ModelView = require('./ModelView');
var Router = require('../routers/Router');
var templates = require('../../lib/manifest');

module.exports = BaseView.extend({
	el: 'html',
	params: require('../../app/app.js'),
	initialize: initialize,
	createStructure: createStructure,
	addRoute: addRoute,
	initPage: initPage,
	getPage: getPage,
	start: start
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
}

function createStructure(){
	this.CurrentUser = new CurrentUser();
	this.Modules = new ModuleCollection();
	this.Router = new Router({ParentView: this});
	this.Pages = {};
	this.HeaderTemplates = {};
	this.FooterTemplates = {};
	this.NavigationTemplates = {};
	this.PageModel = {};
	var that = this;

	var models = templates.models;
	var newModel = {};
	_.each(models,function(model){
		newModel = new ModelView({
			name: model.name,
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
		newPage.setModel('default'); 
		that.Pages[page.name] = newPage;
		that.addRoute(page.url, function(){
			var action = 'init'+page.name;
			action = action.toLowerCase();
			if(_.isFunction(that[action]) && !_.isUndefined(that.Pages[page.name])){
				that[action](that, that.Pages[page.name]);
			}	
			if(!_.isUndefined(that.Pages[page.name])){
				that.Pages[page.name].render();	
			}
			else{
				throw new Error('addRoute : The page '+page.name+' doesn\'t exist');
			}
		});
	});


}

function initPage(name, action){
	if(!_.isUndefined(name) && _.isString(name) && !_.isUndefined(action) && _.isFunction(action)){
		if(!_.isUndefined(this.Pages[name.toLowerCase()])){
			var actionName = 'init'+name;
			actionName = actionName.toLowerCase();
			this[actionName] = action;		
		}
		else{
			throw new Error('initPage : The page '+name+' doesn\'t exist');
		}
	}
	else{
		throw new Error('initPage : The function need 2 parameters, pagename and action');
	}
}

function getPage(pageName){
	if(!_.isUndefined(this.Pages[pageName])){
		return this.Pages[pageName];
	}
	else{
		throw new Error('getPage : The page '+pageName+' doesn\'t exist');
	}
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
	Backbone.history.start();
	var firstPage = this.params.firstPage;
	if(!_.isUndefined(this.Pages[firstPage])){
		this.Pages[firstPage].render();	
	}
	else{
		throw new Error(' start : The page '+firstPage+' doesn\'t exist');
	}
}