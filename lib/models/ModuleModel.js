var BaseModel = require('./BaseModel');
var _ = require('underscore');

var FieldCollection = require('../collections/FieldCollection');
var DataCollection = require('../collections/DataCollection');	// Il faut travailler la data collection

module.exports = BaseModel.extend({
	initialize : initialize
});

function initialize(data, options){
	if(!_.isUndefined(options) && !_.isUndefined(options.className)){
		this.name = options.className;
	}
	else{
		// There is a problem
		throw new Error('ModuleModel : The config file need className attribute');
	}

	if(!_.isUndefined(options) && !_.isUndefined(options.fields)){
		this.FieldList = new FieldCollection(options.fields).toJSON();
	}

	this.views = {};
	this.views.addView = {};		// Ajouter une AddView 
	this.views.editView = {};		// Ajouter une editView
	this.views.listView = {};		// Ajouter une listView
	this.views.searchView = {};		// Ajouter une searchView

	//$$$*** Just for test : Données fictive 
	var datas = [];
	datas.push({DisplayName_001: 'Randet', DisplayName_002: 'Jonathan', DisplayName_003: '23', id: '001'});
	datas.push({DisplayName_001: 'Jackson', DisplayName_002: 'Michael', DisplayName_003: '26', id: '002'});
	this.DataCollection = new DataCollection(datas);
}
