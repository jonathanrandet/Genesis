var Backbone = require('backbone');
var _ = require('underscore');

var DataCollection = require('../collections/DataCollection');


module.exports = Backbone.Model.extend({
	initialize: initialize,
	execute: execute,
	onSuccess: onSuccess,
	onError: onError 
});

function initialize(data, options){		// $$$*** il y a encore des options à ajouter
	if(!_.isUndefined(options)) {
		if(!_.isUndefined(options.url)){
			this.url = options.url;
		}
		if(!_.isUndefined(options.method)){
			this.method = options.method;
		}
	}
	this.datas = new DataCollection();
}

function onSuccess(success){
	if(!_.isUndefined(success) && _.isFunction(success)){
		this.callbackSuccess = success;
	}
}

function onError(error){
	if(!_.isUndefined(error) && _.isFunction(error)){
		this.callbackError = error;
	}
}

function execute(){
	// Do something ...
	
}