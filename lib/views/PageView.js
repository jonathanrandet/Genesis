var Backbone = require('backbone');
Backbone.$ = jQuery;
var _ = require('underscore');

module.exports = Backbone.View.extend({
	el: 'body',
	initialize: initialize,
	setTitle: setTitle,
	setModel: setModel,
	removeModel: removeModel,
	render: render
});

function initialize(data){
	if(!_.isUndefined(data)){
		if(!_.isUndefined(data.name)){
			this.name = data.name;
		}
		else{
			throw new Error('PageView initialize : A page require a name');
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
	this.Title = _.isUndefined(this.ParentView.params.name) ? this.name : this.ParentView.params.name +' - '+ this.name;
}

function setModel(name){
	this.PageModel = name;
}

function removeModel(){
	this.PageModel = '';
}

function render(){
	var data = toTemplateBindings(); // data contiendra les données que l'on passera à Header pour l'afficher
	var Model = this.ParentView.PageModel[this.PageModel];
	var html = '';
	this.ParentView.$('title').text(this.Title);	//$$$   ICI, TROUVER UN MOYEN DE RENDRE CA TEMPLATE AUTO DANS MODELVIEW
	if(!_.isUndefined(Model)){
		Model.render();

		// Display the header of the page 
		if(!_.isUndefined(Model.Header.template) && !_.isUndefined(Model.Header.$el)){
			var templateH = Model.Header.template(data);
			this.$el.find(Model.Header.$el).html(templateH);
		}

		// Display the Navigation of the page 
		if(!_.isUndefined(Model.Navigation.template) && !_.isUndefined(Model.Navigation.$el)){
			var templateN = Model.Navigation.template(data);
			this.$el.find(Model.Navigation.$el).html(templateN);
		}

		//	Display all sections of the page
		html = this.template(data);
		this.$el.find('[data-section=body]').html(html);

		// Display the Footer of the page 
		if(!_.isUndefined(Model.Footer.template) && !_.isUndefined(Model.Footer.$el)){ 
			var templateF = Model.Footer.template(data);
			this.$el.find(Model.Footer.$el).html(templateF);
		}
	}
	else{
		html = this.template(data);
		this.$el.html(html);
	}
}

function toTemplateBindings(){
	var json = {};
	return json;
}

function setTitle(title){
	if(_.isString(title)){
		this.Title = title;
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