var Backbone = require('backbone');
Backbone.$ = jQuery;
var _ = require('underscore');

module.exports = Backbone.View.extend({
	el: 'body',
	initialize: initialize,
	setTitle: setTitle,
	setPageModel: setPageModel,
	render: render
	//createStructure: createStructure
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
		if(!_.isUndefined(data.template)){
			this.template = data.template;
		}
	}
	//this.createStructure();
	//this.setDOMElement();
}

function setPageModel(name){
	this.PageModel = name; //  par défaut c'est model-nomDuModel
}

/*function createStructure (){
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

}*/

function render(){
	var data = toTemplateBindings(); // data contiendra les données que l'on passera à Header pour l'afficher 
	var Model = this.ParentView.PageModel[this.PageModel];
	Model.render();
	// Display the header of the page 
	if(!_.isUndefined(Model.Header.$el)){
		var templateH = Model.Header.template(data);
		this.$el.find(Model.Header.$el).html(templateH);
	}

	// Display the Navigation of the page 
	if(!_.isUndefined(Model.Navigation.$el)){
		var templateN = Model.Navigation.template(data);
		this.$el.find(Model.Navigation.$el).html(templateN);
	}

	//	Display all sections of the page
	var html = this.template(data);
	this.$el.find('[data-section=body]').html(html);

	// Display the Footer of the page 
	if(!_.isUndefined(Model.Footer.$el)){ 
		var templateF = Model.Footer.template(data);
		this.$el.find(Model.Footer.$el).html(templateF);
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