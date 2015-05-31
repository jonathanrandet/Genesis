var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = jQuery;

var CurrentUser = require('./CurrentUserModel');
var ModuleCollection = require('../collections/ModuleCollection');
var	PageView = require('./PageView');

module.exports = Backbone.View.extend({
	el: 'html',
	model: require('../../app/app.js'),
	initialize: initialize
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
}

function createStructure(){
	this.CurrentUser = new CurrentUser();
	this.Modules = new ModuleCollection();
	this.Pages = {};
	// On ajoutera le router ici aussi
}

function loadPages(){
	var that = this;
	$Pages = this.$el('body').find('[data-page]');
	_.each($Pages, function(page){
		var name = page.data('page');
		var url = page.data('url');
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