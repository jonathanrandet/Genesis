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

/*	setDOMElement: setDOMElement,
	show: show,
	hide: hide*/
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

	this.Header = {};
	this.Footer = {};
	this.Navigation = {};
}


function setHeader(tpl){
	this.Header.$el = '[data-section=header]'; //$$$
	this.Header.template = tpl;
}


function setFooter(tpl){
	this.Footer.$el = '[data-section=footer]'; //$$$
	this.Footer.template = tpl;
}

function setNav(tpl){
	this.Navigation.$el = '[data-section=nav]'; //$$$
	this.Navigation.template = tpl;
}

function render(){
	var json = {};
	var html = this.template(json);
	this.$el.html(html);
}

function createStructure (){

	if(!_.isUndefined(this.ParentView) && !_.isUndefined(this.name)){
		var template = this.ParentView.HeaderTemplates['header-'+this.name];
		if(!_.isUndefined(template)){
			this.Header.template = _.isUndefined(template) ? require('../../app/tpl/Header.hbs') : template;
			this.Header.$el = '[data-section=header]';
		}

		template = this.ParentView.FooterTemplates['footer-'+this.name];
		if(!_.isUndefined(template)){
			this.Footer.template = _.isUndefined(template) ? require('../../app/tpl/Footer.hbs') : template;
			this.Footer.$el = '[data-section=footer]';
		}

		template = this.ParentView.NavigationTemplates['nav-'+this.name];
		if(!_.isUndefined(template)){
			this.Navigation.template = _.isUndefined(template) ? require('../../app/tpl/Nav.hbs') : template;
			this.Navigation.$el = '[data-section=nav]';
		}
	}

}