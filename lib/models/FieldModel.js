var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.Model.extend({
	defaults: {
		type: 'text',
		value: ''
	},
	initialize: initialize 
});

function initialize(data){
	if(!_.isUndefined(data)){

		if(!_.isUndefined(data.name) || ( !_.isUndefined(data.attributes) && !_.isUndefined(data.attributes.name))){
			this.name = data.name || data.attributes.name;
		}
		else{
			// There is a problem
			throw new Error('FieldModel : The fieldModule need a name');
		}
		this.formDisplay = getValue(data.formDisplay, true);
		this.listDisplay = getValue(data.listDisplay, true);
		this.set('displayName', getValue(data.displayName, this.name));
	}
}

function getValue(data, defaultVal){	//$$$***  Faire plus tard un fichier util qui contiendra toutes les fonctions utiles.
	var value =	defaultVal;
	if(!_.isUndefined(data)){
		value = data;
	}
	return value;
}


