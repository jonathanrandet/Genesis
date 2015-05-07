var BaseModel = require('./BaseModel');
var _ = require('underscore');

var FieldCollection = require('../collections/FieldCollection');
var DataCollection = require('../collections/DataCollection');

module.exports = BaseModel.extend({
	initialize : initialize
});

function initialize(data){
	if(!_.isUndefined(data) && !_.isUndefined(data.className)){
		this.name = data.className;
	}
	else{
		// There is a problem
		throw new Error('ModuleModel : The config file need className attribute');
	}

	if(!_.isUndefined(data) && !_.isUndefined(data.fields)){
		this.FieldList = new FieldCollection(data.fields);
	}

	this.DataCollection = new DataCollection();
}
