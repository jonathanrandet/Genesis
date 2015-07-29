var BaseView = require('./BaseView');
var _ = require('underscore');
 
module.exports = BaseView.extend({
	initialize: initialize,
	render: render,
	fillform: fillform,
	toTemplateBindings: toTemplateBindings
/*	checkField: checkField,
	setModel: setModel,
	updateModel: updateModel*/

});

function initialize(data){
	this.type = 'edit';
	this.getConfig();
	this.setDOMElement();
	this.template = this.model.templates.editview;
	this.ParentView = this.model.ParentView;

	// Listener
	this.listenTo(this.model, 'add remove change', fillform);
}

function fillform(){
	var that = this;
	_.each(this.model.FieldList, function(field, key){
		that.model.FieldList[key].value = that.model.get(field.displayName);
	});
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




