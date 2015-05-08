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
		this.formDisplay = getValue(data.formDisplay, true);
		this.listDisplay = getValue(data.listDisplay, true);
	}
}

function getValue(data, defaultVal){	//$$$***  Faire plus tard un fichier util qui contiendra toutes les fonctions utiles.
	var value =	defaultVal;
	if(!_.isUndefined(data)){
		value = data.formDisplay;
	}
	return value;
}


