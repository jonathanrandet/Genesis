var Backbone = require('backbone');
var _ = require('underscore');

//var BaseView = require('./BaseView');
var CurrentUser = require('../models/CurrentUserModel');
//var ModuleCollection = require('../collections/ModuleCollection');
var ModuleModel = require('../models/ModuleModel');
var	PageView = require('./PageView');
var	ModelView = require('./ModelView');
var Router = require('../routers/Router');
var templates = require('../../lib/manifest');

var Genesis = Backbone.View.extend({
	el: 'html',
	params: require('../../app/app.js'),
	initialize: initialize,
	createStructure: createStructure,
	loadModules: loadModules,
	addRoute: addRoute,
	initPage: initPage,
	getPage: getPage,
	getData: getData,
	editModel: editModel,
	start: start,
	quickAction: quickAction,
  	addAction: addAction,
  	events: {
  		'click [data-click]': 'quickAction', // click
  		'keyup [data-keyup]': 'quickAction', // keyup
  		'keydown [data-keydown]': 'quickAction', // keydown
  		'focus [data-focus]': 'quickAction', // focusin
  		'blur [data-blur]': 'quickAction', // focusout
  		'mouseover [data-hover]': 'quickAction', // mouseover
  		'mouseleave [data-mouseleave]': 'quickAction', // mouseleave
  		'mouseenter [data-mouseenter]': 'quickAction', //mouseenter
  		'change [data-change]': 'quickAction' // change
  	}
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
	this.loadModules();
}

function createStructure(){
	this.CurrentUser = new CurrentUser();
	//this.Modules = new ModuleCollection();
	this.Modules = {};
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
			route: page.url, 			
			template: page.template,
			ParentView: that
		});
		newPage.setModel('default'); 
		that.Pages[page.name] = newPage;
		that.addRoute(page.url, function(){   //$$$   ICI, TROUVER UN MOYEN de passer les params de l'url 
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
	var modules = templates.modules;
	var that = this;
	_.each(modules, function(module, key){
		var config = module.config;
		var template = module.templates;
		if(!_.isUndefined(config) && !_.isUndefined(config.className)){
			that.Modules[config.className.toLowerCase()] = new ModuleModel({},{
				config: config,
				templates: template,
				parentView: that
			});
		}
		else{
			console.error('LoadModule : Module need className');
		}

	});
}

function getData(modules, params){
	if(_.isString(modules)){
		console.log('module is a string');
	}
	else if(_.isObject(modules) && !_.isArray(modules)){
		console.log('module is a single json');
	}
	else if(_.isArray(modules)){
		_.each(modules,function(value, key){
			if(_.isString(value)){
				console.log('is a string into module');
			}
			else if(_.isObject(value) && !_.isArray(value)){
				console.log('is a json into module');
			}
		});
	}
	if(!_.isUndefined(params) && _.isObject(params) && !_.isArray(params)){
		console.log('params is an json');
	}
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

function quickAction(e) {
	var type = e.type;
	if(type === 'focusin'){ type = 'focus';}
	if(type === 'focusout'){ type = 'blur';}
	var action = $(e.currentTarget).data(type);
	if (_.isFunction(this[action])) {
		this[action](e);
	}
	//e.stopPropagation();
}

function addAction(name, action){
	if(!_.isString(name)){
		throw new Error('addAction : first argument should be a string');
	}
	else if(_.isFunction(action)){
		this[name] = action;
	}
	else{
		this[name] = function(){
			console.log(action);
		};
	}
}

function editModel(e){
	e.preventDefault();
	that = this;
	var $btn = $(e.currentTarget);
	var id = $btn.data('id');
	var moduleName = $btn.parents('[data-template]').attr('data-template');
	moduleName = moduleName.split('-');
	moduleName = moduleName[0].toLowerCase();
	var model = this.Modules[moduleName].DataCollection.findWhere({id : id});
	this.Modules[moduleName].set(model.attributes);
	this.Modules[moduleName].views.editView.render();
}

Genesis = new Genesis();
module.exports = Genesis;
