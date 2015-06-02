var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = jQuery;

var CurrentUser = require('../models/CurrentUserModel');
var ModuleCollection = require('../collections/ModuleCollection');
var	PageView = require('./PageView');

module.exports = Backbone.View.extend({
	el: 'html',
	params: require('../../app/app.js'),
	initialize: initialize,
	createStructure: createStructure,
	loadPages: loadPages,
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
	this.CurrentUser = new CurrentUser();
	this.Modules = new ModuleCollection();
	this.Pages = {};
	this.HeaderTemplates = {};
	this.FooterTemplates = {};
	this.NavigationTemplates = {};
	this.PageModel = {};
	// On ajoutera le router ici aussi
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

function start(){
	var firstPage = this.params.firstPage;
	this.Pages[firstPage].render();
}