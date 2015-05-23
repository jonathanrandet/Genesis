var Backbone = require('backbone');
Backbone.$ = jQuery;
var _ = require('underscore');

module.exports = Backbone.View.extend({
	initialize: initialize
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
		if(!_.isUndefined(data.Parent)){
			this.Parent = data.Parent;
		}
	}

	//this.setDOMElement();
}

function createStructure (){
	this.Header = {};
	this.Footer = {};
	this.Navigation = {};
	this.Sections = [];

	if(!_.isUndefined(this.Parent) && !_.isUndefined(this.name)){
		if(!_.isUndfined(this.Parent.))
	}
}

function render(){
	var data = toTemplateBindings();
	// Display the header of the page 
	if(!_.isUndefined(this.Header.$el)){
		var data = {}; // data contiendra les données que l'on passera à Header pour l'afficher 
		var template = this.Header.template(data);
		this.Header.$el.htlm(template);
	}

	// Display the Navigation of the page 
	if(!_.isUndefined(this.Navigation.$el)){
		var data = {}; // data contiendra les données que l'on passera à Navigation pour l'afficher 
		var template = this.Navigation.template(data);
		this.Navigation.$el.htlm(template);
	}

	//	Display all sections of the page
	_.each(this.Sections, function(section){
		section.render();
	});

	// Display the Footer of the page 
	if(!_.isUndefined(this.Footer.$el)){
		var data = {}; // data contiendra les données que l'on passera à Footer pour l'afficher 
		var template = this.Footer.template(data);
		this.Footer.$el.htlm(template);
	}
}

function toTemplateBindings(){
	var json = {};
	return json;
}




//function hide(){}

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

/*function show(){
	var that = this;
	if(this.el){
		$sections = this.$el.find('[data-template]');
		_.each($sections, function(section){
			if(_.isUndefined(that.$(section).data('generate')) || that.$(section).data('generate').toLowerCase() !== 'manual'){ // Gestion de l'affichage auto des elément généré
				var dataTemplate = that.$(section).data('template').split('-', 2);
				var moduleName = dataTemplate[0].toLowerCase();
				var viewName = dataTemplate[1];
				that.Parent.Modules[moduleName].getView(viewName).render(element);
			}
		});
	}
}*/

/*function setSection(){
	if(this.el){
		this.Sections = this.$el.find('[data-template]');
	}
}
*/