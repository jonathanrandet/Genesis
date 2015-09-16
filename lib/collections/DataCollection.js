var Backbone = require('Backbone');

module.exports = Backbone.Collection.extend({
	initialize: initialize,
	num: num,
	first: first,
	last: last,
	next: next,
	preview: preview
});

function initialize(datas, options){
	this.limit = options.limit || 10;
	this.offset = options.offset || 0;
	this.lastIndex = 0;
}

function num(index){
	if(index >= 0 && index < this.length){
		this.lastIndex = index;
		return this.at(index);
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