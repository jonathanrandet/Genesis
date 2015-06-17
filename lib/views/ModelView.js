var Backbone = require('backbone');
Backbone.$ = jQuery;
var _ = require('underscore');

module.exports = Backbone.View.extend({
	el: 'body',
	initialize: initialize,
	createStructure: createStructure,
	setHeader: setHeader,
	setFooter: setFooter,
	setNav: setNav,
	render: render
});

function initialize(data){
	if(!_.isUndefined(data)){
		if(!_.isUndefined(data.name)){
			this.name = data.name;
		}
		if(!_.isUndefined(data.template)){
			this.template = data.template;
		}
	}
	this.createStructure();
}


function setHeader(tpl){
	if (!_.isUndefined(tpl)){
		this.Header.template = tpl;
	}
}


function setFooter(tpl){
	if (!_.isUndefined(tpl)){
		this.Footer.template = tpl;
	}
}

function setNav(tpl){
	if (!_.isUndefined(tpl)){
		this.Navigation.template = tpl;
	}
}

function render(){
	var json = {};
	var html = this.template(json);
	this.$el.html(html);
}

function createStructure (){
	this.Header = {};
	this.Footer = {};
	this.Navigation = {};
	this.Header.$el = '[data-section=header]';
	this.Footer.$el = '[data-section=footer]'; 
	this.Navigation.$el = '[data-section=nav]'; 
}