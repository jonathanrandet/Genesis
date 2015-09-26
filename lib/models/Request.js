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

	var toto = [
		{nom: 'randet', age: 24, prenom: 'jonathan'},
		{nom: 'randet', age: 23, prenom: 'joelle'},
		{nom: 'randet', age: 19, prenom: 'nicolas'},
		{nom: 'jackson', age: 27}
	];

	this.datas = new DataCollection(toto);
	var tata = this.datas.search({nom: 'randet', prenom: 'jonathan'});

	var tuts = tata.first();
	while (!tata.end){
		console.log(tuts.attributes);
		tuts = tata.next();
	}

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