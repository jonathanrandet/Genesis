var templates = require('../../lib/manifest');
var Backbone = require('backbone');
var _ = require('underscore');

var modules = templates.modules;

module.exports = function (options){
	options = options.toLowerCase();
	var Class = Backbone.Model.extend({
		name : name(),
		fieldList: fieldList(),
		config: config()
	});

	function name(){
		if(_.isUndefined(modules[options])){
			throw new Error('Class : Module '+options+' does\'nt exist.');
		}
		if(_.isUndefined(modules[options].config.className)){
			throw new Error('Class : The attribute className in the '+options+' config file is missing.');
		}
		return modules[options].config.className;
	}

	function fieldList(){
		if(_.isUndefined(modules[options])){
			throw new Error('Class : Module '+options+' does\'nt exist.');
		}
		return modules[options].config.fields;
	}

	function config(){
		if(_.isUndefined(modules[options])){
			throw new Error('Class : Module '+options+' does\'nt exist.');
		}
		return modules[options].config;
	}


	return Class;
};
