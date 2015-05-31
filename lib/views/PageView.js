var Backbone = require('backbone');
Backbone.$ = jQuery;
var _ = require('underscore');

module.exports = Backbone.View.extend({
	el: 'body',
	initialize: initialize,
	setTitle: setTitle
/*	setDOMElement: setDOMElement,
	show: show,
	hide: hide*/
});

function initialize(data){
	if(!_.isUndefined(data)){
		if(!_.isUndefined(data.name)){
			this.name = data.name;
		}
		if(!_.isUndefined(data.route)){
			this.route = data.route;
		}
		if(!_.isUndefined(data.right)){
			this.right = data.right;
		}
		else{
			this.right = 'all';
		}
		if(!_.isUndefined(data.ParentView)){
			this.ParentView = data.ParentView;
		}
	}
	this.createStructure();
	//this.setDOMElement();
}

function createStructure (){
	this.Header = {};
	this.Footer = {};
	this.Navigation = {};
	this.Sections = [];

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
			this.Navigation.template = _.isUndefined(template) ? require('../../app/tpl/Navigation.hbs') : template;
			this.Navigation.$el = '[data-section=nav]';
		}
	}

}

function render(){
	var data = toTemplateBindings(); // data contiendra les données que l'on passera à Header pour l'afficher 
	// Display the header of the page 
	if(!_.isUndefined(this.Header.$el)){
		var templateH = this.Header.template(data);
		this.Header.$el.htlm(templateH);
	}

	// Display the Navigation of the page 
	if(!_.isUndefined(this.Navigation.$el)){
		var templateN = this.Navigation.template(data);
		this.Navigation.$el.htlm(templateN);
	}

	//	Display all sections of the page
	_.each(this.Sections, function(section){
		section.render();
	});

	// Display the Footer of the page 
	if(!_.isUndefined(this.Footer.$el)){ 
		var templateF = this.Footer.template(data);
		this.Footer.$el.htlm(templateF);
	}
}

function toTemplateBindings(){
	var json = {};
	return json;
}


function show(){
	var that = this;
	if(this.el){
		$sections = this.$el.find('[data-template]');
		_.each($sections, function(section){
			if(_.isUndefined(that.$(section).data('generate')) || that.$(section).data('generate').toLowerCase() !== 'manual'){ // Gestion de l'affichage auto des elément généré
				var dataTemplate = that.$(section).data('template').split('-', 2);
				var moduleName = dataTemplate[0].toLowerCase();
				var viewName = dataTemplate[1];


				this.Section[''] = that.ParentView.Modules[moduleName].getView(viewName);
			}
		});
	}
}

function hide(){}

function setTitle(title){
	if(_.isString(title)){
		this.ParentView.$('title').text(title);
	}	
}

/*function setSection(){
	if(this.el){
		this.Sections = this.$el.find('[data-template]');
	}
}
*/

/*function addSection(name,right){
	var data = {};
	if(_.isUndefined(name)){
		throw new error('addBlock : Your block should have a name');
	}
	else{
		data.name = name;
		data.right = _.isUndefined(right) ? 'all' : right;
	}
	this.Blocks.add(data);
}*/

/*function setDOMElement(element){
	if(_.isUndefined(element)){
		if(!_.isUndefined(this.name)){
			this.setElement('[data-page = '+this.name+']');
		}
	}
	else{
		this.setElement(element);
	}
}*/