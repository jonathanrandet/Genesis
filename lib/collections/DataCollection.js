var Backbone = require('Backbone');

module.exports = Backbone.Collection.extend({
	initialize: initialize
});

function initialize(datas, options){
	this.limit = options.limit || 10;
	this.offset = options.offset || 0;
	this.currentIndex = 0;
}

function at(index){
	if(index <= this.length)
}

function first(){

}

function last(){

}

function next(){
	var newIndex = 
	if()
}

function preview(){

}