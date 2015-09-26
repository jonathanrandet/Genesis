var Backbone = require('Backbone');
var _ = require('underscore');
//var DataCollection = require('./DataCollection');

module.exports = Backbone.Collection.extend({
	initialize: initialize,
	num: num,
	first: first,
	last: last,
	next: next,
	preview: preview
});

function initialize(datas, options){
	if(!_.isUndefined(options)){
		this.limit = options.limit || 10;
		this.offset = options.offset || 0;
		this.lastIndex = 0;
		this.end = true;
	}
}

function num(index){
	if(index >= 0 && index < this.length){
		this.lastIndex = index;
		this.end = false;
		return this.at(index);
	}
	else{
		this.end = true;
	}
	return 0;
}

function first(){
	var index = 0;
	return this.num(index);
}

function last(){
	var index = this.length-1;
	return this.num(index);
}

function next(){
	var index = this.lastIndex+1;
	return this.num(index);
}

function preview(){
	var index = this.lastIndex-1;
	return this.num(index);
}

