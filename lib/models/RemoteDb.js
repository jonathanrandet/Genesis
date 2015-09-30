var Backbone = require('backbone');
var _ = require('underscore');

var DataCollection = require('../collections/DataCollection');

module.exports = Backbone.Model.extend({
	initialize: initialize,
	run: run,
	runSQL: runSQL,
	onSuccess: onSuccess,
	onError: onError 
});

function initialize(options){
	//	url, data, type, username, password
	this.params = this.attributes;
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

function run(){
	var params = this.params;
	if(!_.isUndefined(params.url) && (!_.isUndefined(params.method) || !_.isUndefined(params.type))){
		params.success = this.callbackSuccess;
		params.error = this.callbackError;
		$.ajax(params);
	}
	else{
		console.error('run : RemoteDb need url and type parameters');
	}
}

function runSQL(){
	// Do something ...
}


/*var qsel_Article = new RemoteDb();
qsel_Article.params.type = 'POST';
qsel_Article.params.url = 'http://localhost/test.php';
qsel_Article.params.data = {nom: 'jonathan', id: 'titi'};
qsel_Article.onSuccess(function(){

});
qsel_Article.run();*/