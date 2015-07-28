var BaseView = require('./BaseView');
var FieldCollection = require('../collections/FieldCollection');
var _ = require('underscore');

module.exports = BaseView.extend({
	initialize: initialize,
	render: render,
	toTemplateBindings: toTemplateBindings,
	dataBindings: dataBindings
/*	deleteModel: deleteModel,
	editModel: editModel,
	setCollection: setCollection,
	setData: setData*/
});

function initialize(data){
	this.type = 'list';
	this.getConfig();
	this.setDOMElement();
	this.template = this.model.templates.listview;
	this.ParentView = this.model.ParentView;
}

function render(element){	//$$$*** Voir si cette fonction diffère selon les Views 
	this.dataBindings();
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
	var json = {};
	json.empty = false;
	if(_.size(this.tbody) > 0){
		json.thead = this.thead;
		json.tbody = this.tbody;
		json.module = this.config;
	}
	else{
		json.empty = true;
	}

	return json;
}

function dataBindings(){
	var that = this;
	this.thead = {}; this.tbody = {};
	var listField = new FieldCollection(this.model.FieldList);
	var temp = '{', lastField = listField.last();

	listField.each(function(field){
		temp += '"'+field.get('displayName')+'": {"label": "'+field.get('displayName')+'", "display": '+field.listDisplay+'}';
		if(field !== lastField){
			temp += ', ';
		}
		else{
			temp += '}';
		}
	});
	this.thead = JSON.parse(temp);
	var datas = this.model.DataCollection.toJSON();
	var tbody = [];
	_.each(datas, function(model){
		var line = "{";
		_.each(that.thead, function(item, key){
			var elm = JSON.stringify(item);
			elm = elm.substring(0, elm.length-1);
			elm += ', "value": "'+model[key]+'"}';
			line += '"'+key+'": '+elm+',';
		});

		line +=' "id": "'+model.id+'" }';
		line = JSON.parse(line);
		tbody.push(line);
	});
	this.tbody = tbody;
}

/*function deleteModel(e){
	e.preventDefault();
	var $btn = $(e.currentTarget); 
	var id = $btn.data('id');

	if(confirm('Voulez vous vraiment supprimer ?')){
		this.ParentView.DataCollection.remove({id: id});
		this.render();
	}
}

function editModel(e){
	e.preventDefault();
	that = this;
	var $btn = $(e.currentTarget);
	var id = $btn.data('id');
	var model = this.ParentView.DataCollection.findWhere({id : id});
	this.ParentView.views.editView.setModel(model, e);
}

function setCollection(collection){
	if(collection){
		this.collection = collection;
	}
}

function setData(data){
	if(data){
		this.collection.reset(data);
	}
}*/