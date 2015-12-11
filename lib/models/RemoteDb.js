var Backbone = require('backbone');
var _ = require('underscore');

var DataCollection = require('../collections/DataCollection');
var App = require('Genesis');

module.exports = Backbone.Model.extend({
	initialize: initialize,
	run: run,
	onSuccess: onSuccess,
	onComplete: onComplete,
	onError: onError 
});

function initialize(options){
	//	url, data, type, username, password
	this.params = this.attributes;
	if(_.isUndefined(this.params.url) && !_.isUndefined(App.params.remoteDb)){
		this.params.url = App.params.remoteDb;
	}
	this.result = new DataCollection();
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

// Ok
function on200(){

}
// Bad request
function on400(){

}
// Authentification refusée
function on401(){
	
}
// Forbidden
function on403(){
	
}
// Not found
function on404(){

}

// Internal server error
function on500(){
	
}

function onComplete(complete){
	if(!_.isUndefined(complete) && _.isFunction(complete)){
		this.callbackComplete = complete;
	}
}

function run(){
	var params = this.params;
	if(!_.isUndefined(params.url) && (!_.isUndefined(params.method) || !_.isUndefined(params.type))){
		if(!_.isUndefined(this.callbackSuccess)){params.success = this.callbackSuccess;}
		if(!_.isUndefined(this.callbackError)){params.error = this.callbackError;}
		if(!_.isUndefined(this.callbackComplete)){params.complete = this.callbackComplete;}

		$.ajax(params);
	}
	else{
		console.error('run : RemoteDb need url and type parameters');
	}
}