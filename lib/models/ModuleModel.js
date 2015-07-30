var BaseModel = require('./BaseModel');
var _ = require('underscore');

var FieldCollection = require('../collections/FieldCollection');
var DataCollection = require('../collections/DataCollection');	// Il faut travailler la data collection
var AddView = require('../views/AddView');
var ListView = require('../views/ListView');
var EditView = require('../views/EditView');
var SearchView = require('../views/EditView');

module.exports = BaseModel.extend({
	initialize : initialize,
	setAddView: setAddView,
	setListView: setListView,
	setEditView: setEditView,
	setSearchView: setSearchView
});

function initialize(data, options){
	if(!_.isUndefined(options)){
		if(!_.isUndefined(options.config)){
			this.config = options.config;
		}
		if(!_.isUndefined(options.parentView)){
			this.ParentView = options.parentView;
		}
		if(!_.isUndefined(options.config) && !_.isUndefined(options.config.className) ){
			this.name = options.config.className;
		}

		if(!_.isUndefined(options.config) && !_.isUndefined(options.config.fields)){
			this.FieldList = new FieldCollection(options.config.fields).toJSON();
		}

		if(!_.isUndefined(options.templates)){
			this.templates = options.templates;
		}
	}
	else{
		// There is a problem
		throw new Error('ModuleModel : The module need config file');
	}

	this.views = {};
	this.setAddView();				// Ajouter une AddView 
	this.setListView();				// Ajouter une listView
	this.setEditView();				// Ajouter une editView
	this.setSearchView();			// Ajouter une searchView

	//$$$*** Just for test : Données fictive 
	var datas = [];
	datas.push({DisplayName_001: 'Randet', DisplayName_002: 'Jonathan', DisplayName_003: '23', id: '001'});
	datas.push({DisplayName_001: 'Jackson', DisplayName_002: 'Michael', DisplayName_003: '26', id: '002'});
	this.DataCollection = new DataCollection(datas);
}

function setAddView(){
	this.views.addView = new AddView({
		model: this
	});
}

function setListView(){
	this.views.listView = new ListView({
		model: this
	});
}

function setEditView(){
	this.views.editView = new EditView({
		model: this
	});
}

function setSearchView(){
	this.views.searchView = new SearchView({
		model: this
	});
}
