var BaseView = require('./BaseView');
var _ = require('underscore');
 
module.exports = BaseView.extend({
	initialize: initialize,
	render: render,
	toTemplateBindings: toTemplateBindings,
/*	checkField: checkField,
	setModel: setModel,
	fillform: fillform,
	updateModel: updateModel*/

});

function initialize(data){
	this.type = 'edit';
	this.getConfig();
	this.setDOMElement();
	this.template = this.model.templates.editview;
	this.ParentView = this.model.ParentView;
}

function render(element){	//$$$*** Voir si cette fonction diffère selon les Views 
	var html = this.template(this.toTemplateBindings());
	if(_.isUndefined(element)){
		$(this.$el.selector).html(html);
		//this.$el.html(html);
	}
	else{
		$(this.ParentView.$el.selector+' '+element+' '+this.$el.selector).html(html);	//$$$*** Voir pour le parentView
		//$(this.ParentView.$(element).find(this.$el).html(html);	//$$$*** Voir pour le parentView
	}
}

function toTemplateBindings(){
	var json = this.model.FieldList;
	json.module = this.config;
	return json;
}

/*function updateModel(){ // A modifier pour les autres type de champs checkbox ...
	that = this;
	var data = '{';
	var fields = this.collection.toJSON();
	var lastField = _.last(fields);
	_.each(fields, function(field){
		data += '"'+field.displayName+'": "'+that.$('[name="'+field.name+'"]').val()+'"';
		if(field === lastField){
			data += '}';
		}
		else{
			data += ',';
		}
	});
	data = JSON.parse(data);
	this.ParentView.DataCollection.findWhere({id: this.model.get('id')}).set(data);
}*/

/*function setModel(model, event){
	if(model){
		this.model = model;
		this.fillform(event);
	}
	else{
		this.model = new BaseModel();
	}
}

// Cette fonction est à définir
// Fonction pour la validation des champs. Elle ne renvoie rien si tous les champs sont ok sinon le msg d'erreur.
function checkField(val){
	var type = this.model.get('type');
	var required = this.model.get('required');
	if(required){
		if(val === ''){
			return false;
		}
	}
}*/

function fillform(e){ // peut etre l'appelé fillform...
	that = this;
	this.collection.each(function(field){
		field.set('value', that.model.get(field.get('displayName')));
	});
	this.render(this.ParentView.$(e.currentTarget).parents('[data-block]'));
}


