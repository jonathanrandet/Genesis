var BaseModel = require('./BaseModel');
var _ = require('underscore');

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
}