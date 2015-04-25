var Backbone = require('Backbone');
Backbone.$ = jQuery;


module.exports = Backbone.View.extend({
	el: 'div#test',
	initialize: initialize,
	render: render,
	toTemplateBindings: toTemplateBindings,
	forTest: forTest
});

function initialize(data){
	this.template = require('./template.hbs');
	this.render();
}

function render(element){
	var html = this.template(this.toTemplateBindings());
	this.$el.html(html);
}

function toTemplateBindings(){
	var json = {};
	json.nom = "Jonathan";
	return json;
}

function forTest(){
	console.log('tata');
	console.log(Backbone.$('#test').validate());
}